# Dashboard Layout - Estrutura Modular

Este projeto contém um layout de dashboard organizado em componentes React reutilizáveis.

## 📁 Estrutura de Arquivos

```
/
├── App.jsx                      # Arquivo principal
└── components/
    ├── Sidebar.jsx              # Barra lateral com menu
    ├── GraphPanel.jsx           # Painel para gráficos
    └── ContentPanel.jsx         # Painel para conteúdo explicativo
```

## 🧩 Componentes

### App.jsx
Componente principal que:
- Gerencia o estado da seção ativa
- Define os itens do menu
- Importa e organiza todos os componentes

### Sidebar.jsx
Barra lateral que contém:
- Logo/título do dashboard
- Menu de navegação com ícones
- Informação de versão no rodapé

**Props:**
- `menuItems`: Array de objetos com id, label e icon
- `activeSection`: String com o id da seção ativa
- `onSectionChange`: Função callback para mudança de seção

### GraphPanel.jsx
Painel superior para visualizações:
- Área dedicada para gráficos
- Placeholder visual enquanto não há dados
- Título com ícone

### ContentPanel.jsx
Painel inferior para conteúdo:
- Área para textos explicativos
- Suporte para imagens e figuras
- Formatação com espaçamento adequado

## 🚀 Como Usar

1. **Importar no seu projeto:**
   ```bash
   # Copie todos os arquivos para seu projeto React
   ```

2. **Instalar dependências:**
   ```bash
   npm install lucide-react
   ```

3. **Usar o App.jsx como componente principal:**
   ```jsx
   import App from './App';
   
   function Root() {
     return <App />;
   }
   ```

## 🎨 Personalização

### Adicionar novos itens ao menu:
Edite o array `menuItems` em `App.jsx`:
```jsx
const menuItems = [
  { id: 'novo', label: 'Nova Seção', icon: NomeDoIcone },
  // ...
];
```

### Modificar o conteúdo dos painéis:
Edite diretamente `GraphPanel.jsx` ou `ContentPanel.jsx` conforme necessário.

### Adicionar novos componentes:
1. Crie um novo arquivo em `/components/`
2. Importe no `App.jsx`
3. Adicione no layout desejado

## 💡 Próximos Passos

- Adicionar gráficos reais (recharts, chart.js, etc.)
- Implementar roteamento (react-router)
- Criar páginas diferentes para cada seção do menu
- Adicionar temas claro/escuro
- Conectar com backend via API

## 📦 Dependências

- React
- lucide-react (ícones)
- Tailwind CSS (estilos)
## Personal notes

To run:
```
npm run dev
```

Address: http://localhost:5173/
