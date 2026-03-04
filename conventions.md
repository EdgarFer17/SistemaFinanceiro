## Name
1. function (cammelCase):
    - getId()
    - changeName

2. class (CammelCase):
    - Sidebar
    - MainApplication

3. variables:
    1. let (snake_case):
        - past_year
        - graphic_shape
    2. const (SNAKE_CASE):
        - PI
        - EULER
        - VARIANT_OF_GOD
    3. attribute (cammelCase):
        - textContent
        - tabsExistent

## String
values é qualquer variável
calls é qualquer chamada, seja função ou classe

1. calls (''):
    - console.log('texto')
    - item.find('texto')

2. values (""):
    - ["oi", "oie"]
    - let name = "henry"

## General
Sempre terminar operações com ;
- let name = "x";
- startGame();

## Component Pattern
cada componente tem que ser uma classe com os seguintes requisitos obrigatórios:

1. constructor(config):
    - construtor deve receber um objeto chamado config.
    - construtor deve ter a criação de todos os elementos necessários, usando document.createElement();
    - deve chamar o construct e o load.

2. construct(config):
    - método construct deve receber o objeto chamado config.
    - ele vai alterar os atributos e texto interno de elementos, exemplo:
        - textContent
        - onClick

3. load():
    - vai juntar os elementos com elemento.appendChild(elemento)
    - chamar o style()

4. style():
    - vai resetar as classes de cada elemento com: elemento.className = "";
    - vai adicionar as classes para cada elemento com: elemento.classList.add(["classes"])