# SimAudiS — Frontend

Plataforma web interativa para ensino e estudo sobre os mecanismos do sistema auditivo humano. Desenvolvida com React + Vite.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) versão **18 ou superior** (recomendado: v20)
- [npm](https://www.npmjs.com/) versão **9 ou superior** (instalado junto com o Node.js)
- [make](https://www.gnu.org/software/make/) (disponível nativamente no Linux/macOS; no Windows, instalar via [Chocolatey](https://chocolatey.org/): `choco install make`)

Para verificar as versões instaladas:

```bash
node --version
npm --version
make --version
```

## Instalação e execução

### 1. Clone o repositório

```bash
git clone <url-do-repositório>
cd auditory-system-frontend
```

### 2. Instale as dependências

```bash
make install
```

Isso executará `npm install` e instalará todos os pacotes listados em `package.json`.

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com o endereço correto do backend:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/
```

### 4. Execute o servidor de desenvolvimento

```bash
make run
```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173).

> **Atenção:** o frontend consome uma API backend. Certifique-se de que o backend do SimAudiS está rodando antes de usar as funcionalidades que fazem requisições (geração de gráficos, análises, etc.). Consulte o repositório do backend para instruções de execução.

## Outros comandos disponíveis

| Comando | Descrição |
|---|---|
| `make install` | Instala as dependências do projeto |
| `make run` | Inicia o servidor de desenvolvimento |
| `make build` | Gera o build de produção na pasta `dist/` |

## Estrutura do projeto

```
auditory-system-frontend/
├── public/                  # Arquivos estáticos públicos
├── src/
│   ├── assets/              # Imagens e recursos estáticos
│   ├── components/
│   │   ├── explanations/    # Sidebars explicativas de cada página
│   │   ├── graphs/          # Componentes de gráfico (um por funcionalidade)
│   │   ├── pages/           # Páginas principais da aplicação
│   │   └── sidebars/        # Sidebars de controle de cada página
│   ├── contexts/
│   │   ├── LanguageContext.jsx   # Gerenciamento de idioma
│   │   └── SettingsContext.jsx   # Estado global de configurações
│   ├── services/
│   │   └── api.jsx          # Funções de chamada à API backend
│   ├── translations.json    # Todas as traduções (PT, EN, ES)
│   ├── App.jsx              # Componente raiz e roteamento
│   └── main.jsx             # Ponto de entrada
├── Makefile
├── package.json
└── vite.config.js
```

## Páginas da aplicação

| Página | Descrição |
|---|---|
| **Início** | Apresentação da plataforma |
| **Configurações** | Definição do sinal de entrada (tipo, faixa de frequência) e visualização do espectro |
| **Fundamentos** | Conceitos de acústica (ondas sonoras) e vibrações (sistemas de 1 grau de liberdade) |
| **Orelha Externa** | FRF do canal auditivo, análise no domínio do espaço e da frequência |
| **Orelha Média** | FRF e resposta à excitação da orelha média |
| **Orelha Interna** | Ondas viajantes e envelope do deslocamento da membrana basilar |

## Tecnologias utilizadas

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [Recharts](https://recharts.org/) — gráficos interativos
- [Lucide React](https://lucide.dev/) — ícones

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_BASE_URL` | URL base da API backend | `https://api.simaudis.com/` |

O arquivo `.env` nunca deve ser commitado. Use `.env.example` como referência. Em produção, configure a variável diretamente no painel da plataforma de deploy (Vercel ou Netlify).

## Deploy (Vercel / Netlify)

O repositório já inclui os arquivos de configuração para ambas as plataformas.

### Vercel

1. Importe o repositório em [vercel.com](https://vercel.com)
2. Em **Settings → Environment Variables**, adicione `VITE_API_BASE_URL` com a URL do backend em produção
3. O deploy ocorrerá automaticamente a cada push na branch configurada

### Netlify

1. Importe o repositório em [netlify.com](https://netlify.com)
2. Em **Site settings → Environment variables**, adicione `VITE_API_BASE_URL`
3. As configurações de build (`npm run build`, pasta `dist/`) já estão definidas em `netlify.toml`

> Em ambas as plataformas, o comando de build é `npm run build` e o diretório de publicação é `dist/`.

## Internacionalização

A plataforma suporta três idiomas: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**. Todas as strings de interface estão centralizadas em `src/translations.json`, organizadas por idioma e seção. O idioma pode ser alternado pelo seletor no canto superior direito da interface.
