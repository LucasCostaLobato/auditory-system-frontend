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

### 3. Execute o servidor de desenvolvimento

```bash
make run
```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173).

> **Atenção:** o frontend consome uma API backend. Certifique-se de que o backend do SimAudiS está rodando localmente em `http://127.0.0.1:8000` antes de usar as funcionalidades que fazem requisições (geração de gráficos, análises, etc.). Consulte o repositório do backend para instruções de execução.

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

## Configuração da API

O endereço base da API está definido em `src/services/api.jsx`:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/';
```

Altere essa constante caso o backend esteja rodando em outro endereço ou porta.

## Internacionalização

A plataforma suporta três idiomas: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**. Todas as strings de interface estão centralizadas em `src/translations.json`, organizadas por idioma e seção. O idioma pode ser alternado pelo seletor no canto superior direito da interface.
