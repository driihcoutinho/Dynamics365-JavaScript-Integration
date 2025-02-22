import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  id: string;
  username: string;
  age: number;
  location?: string;
  profilePicture: string;
  online: boolean;
  gender: 'fem' | 'desfem' | 'trans';
  sexualOrientation: 'lesbian' | 'bisexual' | 'pansexual';
  bio?: string;
  glFavorite?: string;
}

@Component({
  selector: 'app-elo',
  templateUrl: './elo.page.html',
  styleUrls: ['./elo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EloPage implements OnInit {
  @ViewChild('profileModal') profileModal!: IonModal;
  
  users: User[] = [
    {
      id: '1',
      username: '@marina',
      age: 25,
      location: 'São Paulo, SP',
      profilePicture: 'assets/placeholder-profile.jpg',
      online: true,
      gender: 'fem',
      sexualOrientation: 'lesbian',
      bio: 'Apaixonada por música e arte. Procurando conexões genuínas.',
      glFavorite: 'Juliana Paes'
    },
    {
      id: '2',
      username: '@carol',
      age: 28,
      location: 'Rio de Janeiro, RJ',
      profilePicture: 'assets/placeholder-profile.jpg',
      online: false,
      gender: 'desfem',
      sexualOrientation: 'bisexual',
      bio: 'Amo viajar e conhecer lugares novos.',
      glFavorite: 'Bruna Marquezine'
    },
    // Adicione mais usuários mock aqui
  ];

  selectedUser: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Aqui iremos carregar os usuários do backend quando implementarmos
  }

  showUserProfile(user: User) {
    this.selectedUser = user;
    this.profileModal.present();
  }

  async onLike(user: User, event?: Event) {
    if (event) {
      event.stopPropagation(); // Previne a abertura do modal ao clicar no botão
    }
    
    try {
      // Aqui implementaremos a lógica de like quando tivermos o backend
      console.log('Liked user:', user.username);
    } catch (error) {
      console.error('Error liking user:', error);
    }
  }

  async onChat(user: User, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      // Navegação para o chat com o usuário
      this.router.navigate(['/chat', user.id]);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  }

  async onReport(user: User, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      // Aqui implementaremos a lógica de denúncia quando tivermos o backend
      console.log('Reported user:', user.username);
    } catch (error) {
      console.error('Error reporting user:', error);
    }
  }
}
