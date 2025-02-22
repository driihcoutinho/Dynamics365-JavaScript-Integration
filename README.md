# OREBU

OREBU é um aplicativo de relacionamento para mulheres, desenvolvido com Ionic/Angular e Firebase.

## 🎨 Paleta de Cores

| Cor          | Código     | Aplicação                          |
|--------------|------------|------------------------------------|
| Verde-água   | `#b5dcc5` | Cor primária (botões, destaques)   |
| Cinza claro  | `#e0e0e0` | Fundo de telas                     |
| Verde-escuro | `#a8c3b5` | Textos e bordas                    |
| Rosa pálido  | `#d4a5a5` | Botões secundários e detalhes      |
| Bege claro   | `#f0e6d4` | Fundo de cards e divisores         |
| Pêssego      | `#ffcc99` | Destaques e ícones interativos     |

## 🚀 Começando

### Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)
- Ionic CLI
- Angular CLI
- Conta no Firebase

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/orebu.git
cd orebu
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Copie as credenciais do Firebase
   - Atualize os arquivos `src/environments/environment.ts` e `environment.prod.ts`

4. Execute o projeto localmente:
```bash
ionic serve
```

## 📱 Funcionalidades

### Autenticação
- Login com email/senha
- Registro de nova conta
- Termos e condições

### Feed
- Visualização de posts
- Criação de posts
- Like/Dislike em posts
- Denúncia de posts inadequados

### Elo
- Grid de perfis
- Status online/offline
- Interação com outros usuários
- Sistema de match

## 🛠️ Tecnologias

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Firebase](https://firebase.google.com/)
  - Authentication
  - Firestore
  - Storage

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas do aplicativo
│   ├── services/      # Serviços
│   └── guards/        # Guards de rota
├── assets/           # Recursos estáticos
├── environments/     # Configurações de ambiente
└── theme/           # Estilos globais
```

## 🔒 Segurança

- Autenticação segura via Firebase
- Validação de formulários
- Proteção de rotas
- Sanitização de dados

## 📱 PWA

O aplicativo é uma Progressive Web App (PWA) e pode ser instalado em dispositivos móveis através do navegador.

## 🌙 Modo Escuro

Suporte nativo ao modo escuro/claro com detecção automática das preferências do sistema.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🤝 Suporte

Para reportar bugs ou solicitar novas funcionalidades, abra uma [issue](https://github.com/seu-usuario/orebu/issues).

## 📝 Notas de Versão

### v1.0.0
- Lançamento inicial
- Funcionalidades básicas de autenticação
- Feed de posts
- Sistema de Elo
