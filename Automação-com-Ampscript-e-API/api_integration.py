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
