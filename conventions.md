## Name

1. function (cammelCase):
    - `getId()`
    - `changeName`

2. class (CammelCase):
    - `Sidebar`
    - `MainApplication`

3. variables:
    1. let (snake_case):
        - `past_year`
        - `graphic_shape`
    2. const (SNAKE_CASE):
        - `PI`
        - `EULER`
        - `VARIANT_OF_GOD`
    3. attribute (snake_case):
        - `text_content`
        - `tabs_existent`

## String

values é qualquer variável
calls é qualquer chamada, seja função ou classe

1. calls (''):
    - `console.log('texto')`
    - `item.find('texto')`

2. values (""):
    - `["oi", "oie"]`
    - `let name = "henry"`

## General

Sempre terminar operações com ;

- `let name = "x";`
- `startGame();`

## Component Pattern

cada componente tem que ser uma classe com os seguintes requisitos obrigatórios:

1. BaseComponent
    - Cada componente tem que extender do BaseComponent.
    - Cada um dos métodos abaixo são obrigatórios
    - O BaseComponent lida com a organização da criação total do componente

2. constructor(config):
    - construtor deve receber um objeto chamado config.
    - e chamar o método super com o config: `super(config);`

3. spawn():
    - vai conter a criação de todos os elementos usados no componente
    - usa especificamente `createElement();`

4. setup(config):
    - método construct deve receber o objeto chamado config.
    - ele vai alterar os atributos e texto interno de elementos, exemplo:
        - textContent
        - onClick

5. style():
    - vai resetar as classes de cada elemento com: `elemento.className = "";`
    - vai adicionar as classes para cada elemento com: `elemento.classList.add(...["classes"])`

6. build():
    - vai juntar os elementos com `elemento.replaceChildren(elemento)` em ordem.

## convention tests

Use:

```bash
npx eslint
npx prettier
```
