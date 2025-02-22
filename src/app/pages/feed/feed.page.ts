import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  posts: Post[] = [];
  currentUser: User | null = null;
  newPostContent: string = '';
  isCreatingPost: boolean = false;
  isLoading: boolean = true;
  private postsSubscription?: Subscription;
  private userSubscription?: Subscription;
  private pageSize: number = 10;
  private lastPostId?: string;

  constructor(
    private feedService: FeedService,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.loadInitialPosts();
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private async loadInitialPosts() {
    try {
      this.isLoading = true;
      const posts = await this.feedService.getPosts(this.pageSize)
        .pipe(take(1))
        .toPromise();
      
      this.posts = posts || [];
      if (this.posts.length > 0) {
        this.lastPostId = this.posts[this.posts.length - 1].id;
      }
    } catch (error) {
      await this.uiService.showError('Failed to load posts');
    } finally {
      this.isLoading = false;
    }
  }

  async loadMorePosts(event: any) {
    if (!this.lastPostId) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    try {
      const newPosts = await this.feedService.getPostsAfter(this.lastPostId, this.pageSize)
        .pipe(take(1))
        .toPromise();
      
      if (newPosts && newPosts.length > 0) {
        this.posts = [...this.posts, ...newPosts];
        this.lastPostId = newPosts[newPosts.length - 1].id;
      } else {
        event.target.disabled = true;
      }
    } catch (error) {
      await this.uiService.showError('Failed to load more posts');
    } finally {
      event.target.complete();
    }
  }

  showCreatePost() {
    this.isCreatingPost = true;
  }

  async createPost() {
    if (!this.newPostContent || this.newPostContent.length > 400) {
      return;
    }

    try {
      await this.uiService.showLoading('Creating post...');
      await this.feedService.createPost(this.newPostContent);
      this.newPostContent = '';
      this.isCreatingPost = false;
      await this.uiService.showSuccess('Post created successfully');
      await this.loadInitialPosts();
    } catch (error) {
      await this.uiService.showError('Failed to create post');
    } finally {
      await this.uiService.hideLoading();
    }
  }

  async onLike(post: Post, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (!post.id) return;

    try {
      await this.feedService.likePost(post.id);
    } catch (error) {
      await this.uiService.showError('Failed to like post');
    }
  }

  async onDislike(post: Post, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (!post.id) return;

    try {
      await this.feedService.dislikePost(post.id);
    } catch (error) {
      await this.uiService.showError('Failed to dislike post');
    }
  }

  async onReport(post: Post, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (!post.id) return;

    const confirmed = await this.uiService.showConfirm(
      'Report Post',
      'Are you sure you want to report this post?'
    );

    if (confirmed) {
      try {
        await this.feedService.reportPost(post.id);
        await this.uiService.showSuccess('Post reported successfully');
      } catch (error) {
        await this.uiService.showError('Failed to report post');
      }
    }
  }

  cancelPost() {
    this.newPostContent = '';
    this.isCreatingPost = false;
  }

  hasUserLiked(post: Post): boolean {
    return this.currentUser ? (post.userLikes || []).includes(this.currentUser.uid) : false;
  }

  hasUserDisliked(post: Post): boolean {
    return this.currentUser ? (post.userDislikes || []).includes(this.currentUser.uid) : false;
  }
}
