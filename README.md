# Constância — Landing Page

Site de captação de leads para o projeto Constância (método de hábito espiritual).

## Rodar no Termux (Android)

```bash
# 1. Instalar Python e pip
pkg update && pkg install python

# 2. Entrar na pasta do projeto
cd constancia

# 3. Instalar dependências
pip install flask gunicorn

# 4. Iniciar o servidor
python app.py
```

Abra no navegador: `http://localhost:5000`

## Subir para o GitHub

```bash
# Na pasta do projeto:
git init
git add .
git commit -m "feat: Constância landing page"

# Crie um repositório em github.com e conecte:
git remote add origin https://github.com/SEU_USUARIO/constancia.git
git branch -M main
git push -u origin main
```

## Hospedar de graça online

### Opção 1 — Render.com (recomendado)
1. Acesse render.com e crie conta grátis
2. "New Web Service" → conecte seu GitHub → selecione o repositório
3. Build command: `pip install flask gunicorn`
4. Start command: `gunicorn app:app`
5. Clique em "Deploy" → seu site fica em `https://constancia.onrender.com`

### Opção 2 — Railway.app
1. Acesse railway.app e crie conta
2. "New Project" → "Deploy from GitHub repo"
3. Selecione o repositório → deploy automático
4. Vá em "Settings" → "Domains" → gere um domínio grátis

### Opção 3 — PythonAnywhere (mais simples)
1. Acesse pythonanywhere.com → crie conta grátis
2. Vá em "Files" e faça upload do projeto
3. "Web" → "Add a new web app" → Flask
4. Configure o caminho do app.py

## Ver os leads cadastrados

Acesse:
```
https://seusite.onrender.com/leads?senha=constancia2026
```

Para mudar a senha, defina a variável de ambiente `ADMIN_SENHA` no painel do Render/Railway.

## Estrutura do projeto

```
constancia/
├── app.py              # Servidor Flask principal
├── requirements.txt    # Dependências Python
├── Procfile            # Comando para deploy (Render/Railway)
├── runtime.txt         # Versão do Python
├── leads.db            # Banco SQLite (criado automaticamente)
├── leads.csv           # Exportação dos leads (criada automaticamente)
├── static/
│   ├── css/style.css   # Estilos glassmorphism
│   └── js/main.js      # Animações e interações
└── templates/
    └── index.html      # Página principal
```
