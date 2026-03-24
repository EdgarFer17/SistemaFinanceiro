# 💰 Gerenciador Financeiro Pessoal (TargetFinance)

Uma aplicação web **Single Page Application (SPA)** desenvolvida com JavaScript Vanilla (Puro) para controle de finanças pessoais. O sistema permite o gerenciamento completo de receitas, despesas e categorias, com atualizações em tempo real e foco em performance e acessibilidade.

## ✨ Funcionalidades

* **CRUD de Transações:** Adicione, edite e remova entradas (Receitas) e saídas (Despesas).
* **Gestão de Categorias:** Crie categorias personalizadas e defina limites de orçamento mensal.
* **Filtros Avançados:** Filtre seu histórico financeiro por mês, categoria, tipo (Receita/Despesa) ou busque transações específicas por texto.
* **Dashboard Reativo:** A interface se atualiza automaticamente ao criar ou excluir dados.
* **Responsividade Híbrida:** Layout em formato de tabela no Desktop e formato de "Cards" dinâmicos no Mobile para melhor UX.
* **Segurança e Acessibilidade:** Proteção contra XSS na inserção de dados e tags ARIA (`role="table"`, `role="cell"`) para suporte completo a leitores de tela.

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3**
* **JavaScript (ES6+)** - Paradigma Orientado a Objetos (Classes, Módulos, Herança).
* **Bootstrap** - Para estilização e sistema de grid responsivo.
* **DOM API Nativa** - Manipulação de elementos de forma otimizada (`replaceChildren`, fragmentos) sem uso de frameworks pesados.
* **Local Storage** - Persistência de dados local no navegador.

## 🚀 Como executar o projeto

Como o projeto é feito com tecnologias web padrão (Client-side), não é necessário instalar dependências complexas.

1. Clone este repositório:
   ```bash
   git clone REPOSITORIO

2. Navegue até a pasta do projeto:
   ```bash
   cd SistemaFinanceiro

3. Abra o arquivo *index.html* no seu navegador, ou utilize a extensão Live Server no VS Code para uma melhor experiência.


4. Estrutura Padrão do Projeto
A arquitetura do projeto foi dividida seguindo conceitos do padrão MVC (Model-View-Controller) para facilitar a manutenção:

    ```
    /components: Componentes visuais da interface. Todos herdam de uma classe base (BaseComponent.js).

    /controller: Regras de negócio e comunicação entre os dados e a interface.

    /model: Estrutura dos objetos de dados (Transações, Categorias).

    /repository: Camada de acesso aos dados (LocalStorage).

# 👨‍💻 Autores
### Desenvolvido por Naum, Henry, Lucas e Edgar

### [GitHub-Naum](https://github.com/NvB23), [GitHub-Henry](https://github.com/Hnry-Gab), [GitHub-Lucas](https://github.com/LucasGonMoreira) e [Github - Edgar](https://github.com/EdgarFer17)