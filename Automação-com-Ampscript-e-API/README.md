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

## Configuração do Automation Studio

1. **Criação do Automation:**
   - No Automation Studio, crie um novo Automation.
   - Nomeie-o como "Campanha de E-mail Automatizada".

2. **Adicionar Atividades:**
   - Adicione uma atividade "Import File" para carregar dados na Data Extension.
   - Adicione uma atividade "Send Email" para enviar o e-mail personalizado.
   - Configure a atividade "Send Email" para usar o template com Ampscript criado.

3. **Agendamento:**
   - Configure o agendamento para executar diariamente ou quando novos dados forem detectados.
   - Defina gatilhos apropriados para iniciar o Automation.

4. **Monitoramento:**
   - Configure alertas para monitorar o sucesso ou falha do Automation.
   - Adicione logs para rastrear o processamento de cada registro.

## Exemplos de Código

### Ampscript (EmailTemplate.ampscript)
```ampscript
%%[
/* Exemplo de Ampscript para personalização de e-mail */
SET @nome = AttributeValue("Nome")
SET @produto = AttributeValue("Produto")

IF NOT EMPTY(@nome) AND NOT EMPTY(@produto) THEN
]%%
<html>
<body>
    <p>Olá, %%=v(@nome)=%%,</p>
    <p>Vimos que você se interessou por %%=v(@produto)=%%. Aqui estão mais detalhes sobre ele:</p>
    <p>Descrição do produto: %%=Lookup("Produtos", "Descrição", "Nome", @produto)=%%</p>
</body>
</html>
%%[ ELSE ]%%
<html>
<body>
    <p>Olá,</p>
    <p>Obrigado por se inscrever em nossa newsletter!</p>
</body>
</html>
%%[ ENDIF ]%%
```

### API Integration (api_integration.py)
```python
import requests

# Configurações da API SFMC
AUTH_URL = "https://YOUR_SUBDOMAIN.auth.marketingcloudapis.com/v2/token"
API_URL = "https://YOUR_SUBDOMAIN.rest.marketingcloudapis.com/hub/v1/dataevents/key:YOUR_DATA_EXTENSION_KEY/rows"

# Credenciais
CLIENT_ID = "your_client_id"
CLIENT_SECRET = "your_client_secret"

def get_access_token():
    """Obtém o token de acesso da API SFMC."""
    payload = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    response = requests.post(AUTH_URL, json=payload)
    response.raise_for_status()
    return response.json()["access_token"]

def add_record_to_data_extension(record):
    """Adiciona um registro à Data Extension."""
    access_token = get_access_token()
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(API_URL, json=record, headers=headers)
    response.raise_for_status()
    return response.json()

# Exemplo de uso
if __name__ == "__main__":
    record = {
        "Nome": "João Silva",
        "Email": "joao.silva@example.com",
        "Produto": "Smartphone XYZ"
    }
    result = add_record_to_data_extension(record)
    print("Registro adicionado com sucesso:", result)
```
