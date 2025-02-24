import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Post {
  id?: string;
  content: string;
  timestamp: Date;
  likes: number;
  dislikes: number;
  userLikes?: string[]; // Array de UIDs dos usuários que deram like
  userDislikes?: string[]; // Array de UIDs dos usuários que deram dislike
  reports?: number;
  isAnonymous: boolean;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getPosts(limit: number = 10): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', ref => 
        ref.orderBy('timestamp', 'desc')
           .limit(limit)
      )
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  getPostsAfter(lastPostId: string, limit: number = 10): Observable<Post[]> {
    return this.firestore
      .collection<Post>('posts', ref => {
        const lastPost = this.firestore.doc(`posts/${lastPostId}`);
        return ref.orderBy('timestamp', 'desc')
                 .startAfter(lastPost)
                 .limit(limit);
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  async createPost(content: string, isAnonymous: boolean = true): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const post: Post = {
        content,
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        userLikes: [],
        userDislikes: [],
        reports: 0,
        isAnonymous,
        userId: isAnonymous ? undefined : user.uid
      };

      await this.firestore.collection('posts').add(post);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async likePost(postId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const postRef = this.firestore.collection('posts').doc(postId);
      const postDoc = await postRef.get().toPromise();
      
      if (!postDoc?.exists) throw new Error('Post not found');
      
      const post = postDoc.data() as Post;
      const userLikes = post.userLikes || [];
      const userDislikes = post.userDislikes || [];

      if (userLikes.includes(user.uid)) {
        // Remove like
        await postRef.update({
          likes: post.likes - 1,
          userLikes: userLikes.filter(uid => uid !== user.uid)
        });
      } else {
        // Add like and remove dislike if exists
        const updates: Partial<Post> = {
          likes: post.likes + 1,
          userLikes: [...userLikes, user.uid]
        };

        if (userDislikes.includes(user.uid)) {
          updates.dislikes = post.dislikes - 1;
          updates.userDislikes = userDislikes.filter(uid => uid !== user.uid);
        }

        await postRef.update(updates);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  async dislikePost(postId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) throw new Error('User not authenticated');

      const postRef = this.firestore.collection('posts').doc(postId);
      const postDoc = await postRef.get().toPromise();
      
      if (!postDoc?.exists) throw new Error('Post not found');
      
      const post = postDoc.data() as Post;
      const userLikes = post.userLikes || [];
      const userDislikes = post.userDislikes || [];

      if (userDislikes.includes(user.uid)) {
        // Remove dislike
        await postRef.update({
          dislikes: post.dislikes - 1,
          userDislikes: userDislikes.filter(uid => uid !== user.uid)
        });
      } else {
        // Add dislike and remove like if exists
        const updates: Partial<Post> = {
          dislikes: post.dislikes + 1,
          userDislikes: [...userDislikes, user.uid]
        };

        if (userLikes.includes(user.uid)) {
          updates.likes = post.likes - 1;
          updates.userLikes = userLikes.filter(uid => uid !== user.uid);
        }

        await postRef.update(updates);
      }
    } catch (error) {
      console.error('Error disliking post:', error);
      throw error;
    }
  }

  async reportPost(postId: string): Promise<void> {
    try {
      const postRef = this.firestore.collection('posts').doc(postId);
      const postDoc = await postRef.get().toPromise();
      
      if (!postDoc?.exists) throw new Error('Post not found');
      
      const post = postDoc.data() as Post;
      await postRef.update({
        reports: (post.reports || 0) + 1
      });
    } catch (error) {
      console.error('Error reporting post:', error);
      throw error;
    }
  }
}
