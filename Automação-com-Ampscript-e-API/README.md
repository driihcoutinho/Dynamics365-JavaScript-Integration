# Automação de Campanhas de E-mail com Ampscript e API

Este projeto visa criar uma campanha de e-mail automatizada utilizando Ampscript para personalização e integração com a API de SFMC para atualização de dados em tempo real.

## Passos do Projeto

1. **Criação de Data Extension:**
   - Crie uma Data Extension para armazenar informações de clientes (ex.: Nome, Email, Produto de Interesse, etc.).

2. **Desenvolvimento do E-mail:**
   - Use Ampscript para personalizar o conteúdo do e-mail com base nos dados do cliente (ex.: "Olá, %%Nome%%, vimos que você se interessou por %%Produto%%!").

3. **Automação:**
   - Crie um Automation Studio para enviar o e-mail automaticamente quando um novo registro for adicionado à Data Extension.

4. **Integração com API:**
   - Use a API de SFMC (REST ou SOAP) para adicionar ou atualizar registros na Data Extension a partir de um sistema externo (pode ser um script em Python ou Node.js).

## Habilidades Demonstradas
- Ampscript
- Automação no Automation Studio
- Integração com API
- Gerenciamento de Data Extensions
