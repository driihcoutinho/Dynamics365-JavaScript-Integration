import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  username?: string;
  birthdate?: string;
  gender?: 'fem' | 'desfem' | 'trans';
  sexualOrientation?: 'lesbian' | 'bisexual' | 'pansexual';
  profilePicture?: string;
  status: 'online' | 'offline';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Observar mudanças no estado de autenticação
    this.afAuth.authState.subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await this.firestore
          .collection('users')
          .doc(firebaseUser.uid)
          .get()
          .toPromise();

        if (userDoc?.exists) {
          const userData = userDoc.data() as Omit<User, 'uid'>;
          this.user.next({
            uid: firebaseUser.uid,
            ...userData
          });
        }
      } else {
        this.user.next(null);
      }
    });
  }

  async register(email: string, password: string, userData: Partial<User>): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        // Criar documento do usuário no Firestore
        await this.firestore.collection('users').doc(credential.user.uid).set({
          email,
          status: 'online',
          ...userData
        });
        
        // Navegar para a página de termos
        this.router.navigate(['/terms']);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      // Atualizar status para online
      const user = await this.getCurrentUser();
      if (user) {
        await this.firestore.collection('users').doc(user.uid).update({
          status: 'online'
        });
      }
      this.router.navigate(['/feed']);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        // Atualizar status para offline antes de fazer logout
        await this.firestore.collection('users').doc(user.uid).update({
          status: 'offline'
        });
      }
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = await this.afAuth.currentUser;
    if (!firebaseUser) return null;

    const userDoc = await this.firestore
      .collection('users')
      .doc(firebaseUser.uid)
      .get()
      .toPromise();

    if (userDoc?.exists) {
      const userData = userDoc.data() as Omit<User, 'uid'>;
      return {
        uid: firebaseUser.uid,
        ...userData
      };
    }

    return null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  async updateUserProfile(uid: string, data: Partial<User>): Promise<void> {
    try {
      await this.firestore.collection('users').doc(uid).update(data);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}
