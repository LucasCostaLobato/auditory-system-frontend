# Plataforma de Ensino sobre o Sistema Auditivo

Uma plataforma web interativa para ensino sobre mecanismos da audição, desenvolvida com React + Vite.

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Sidebar.jsx     # Menu principal lateral
│   ├── HomePage.jsx    # Página inicial
│   ├── SettingsPage.jsx         # Página de configurações
│   ├── SettingsSidebar.jsx      # Sidebar de configurações
│   ├── SpectrumGraph.jsx        # Gráfico de espectro (específico)
│   └── LanguageSelector.jsx     # Seletor de idioma
├── contexts/
│   └── LanguageContext.jsx      # Contexto para gerenciamento de idiomas
├── translations.json             # Arquivo com todas as traduções (PT, EN, ES)
├── App.jsx                       # Componente principal
└── main.jsx                      # Ponto de entrada
```

## Funcionalidades Implementadas

### ✅ Menu Principal (Sidebar Esquerda)
- Início (página padrão)
- Configurações
- Orelha externa (em desenvolvimento)
- Orelha média (em desenvolvimento)
- Orelha interna (em desenvolvimento)

### ✅ Sistema de Tradução
- 3 idiomas: Português, Inglês e Espanhol
- Seletor de idioma no canto superior direito
- Traduções centralizadas no arquivo `src/translations.json`

### ✅ Página Início
- Apresentação da plataforma
- Conteúdo editável no arquivo de traduções

### ✅ Página Configurações
- **Sidebar Secundária** com:
  - Dropdown de tipo de sinal (Ruído branco ideal / Sinal de fala)
  - Campos para faixa de frequência (inicial, final, número de pontos)
  - Botão "Ver espectro"
- **Área de Gráfico**:
  - Gráfico XY específico para espectro
  - Integração com API (placeholder)
  - Dados mockados para teste

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Tecnologias Utilizadas

- **React 19** - Framework UI
- **Vite** - Build tool
- **Recharts** - Biblioteca de gráficos
- **Axios** - Requisições HTTP

## Configuração da API

O endpoint da API está configurado em `src/components/SettingsPage.jsx:14`:

```javascript
const response = await axios.get('https://api.placeholder.com/spectrum', {
  params: {
    signal_type: params.signalType,
    start_freq: params.startFrequency,
    end_freq: params.endFrequency,
    num_points: params.frequencyPoints
  }
});
```

**Para atualizar a URL da API:**
1. Abra o arquivo `src/components/SettingsPage.jsx`
2. Localize a linha 14
3. Substitua `https://api.placeholder.com/spectrum` pela URL real
4. Ajuste os parâmetros conforme necessário

## Adicionando Novos Idiomas

Para adicionar um novo idioma, edite `src/translations.json`:

```json
{
  "pt": { ... },
  "en": { ... },
  "es": { ... },
  "fr": {
    "menu": {
      "home": "Accueil",
      ...
    }
  }
}
```

## Próximos Passos

1. Adicionar conteúdo para as páginas Orelha Externa, Média e Interna
2. Criar gráficos específicos para cada funcionalidade
3. Conectar com a API real
4. Adicionar mais traduções e conteúdo educacional

## Estrutura de Gráficos

**IMPORTANTE:** Cada gráfico possui seu próprio componente com código específico. Não há código genérico compartilhado entre gráficos. Isso permite personalização total de:
- Títulos dos eixos
- Escalas
- Cores
- Tipos de visualização
- Labels e legendas

Exemplo: `SpectrumGraph.jsx` é exclusivo para o gráfico de espectro das configurações.

## Notas

- O projeto usa dados mockados quando a API não está disponível
- Cada funcionalidade que gera gráficos terá seu próprio componente de gráfico
- As traduções são carregadas dinamicamente conforme o idioma selecionado
