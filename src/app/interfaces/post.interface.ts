import { Timestamp } from '@angular/fire/firestore';

export interface Post {
  id?: string;
  content: string;
  createdAt: Timestamp;
  userId: string;
  likes: number;
  dislikes: number;
  userLikes?: string[];
  userDislikes?: string[];
  reported?: boolean;
}
