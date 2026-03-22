1. alterar o category para incluir o percentual de orcamento
2. alterar a lógica para modificar a cor da categoria na transactions, (tabela e select no modal).
    - 0% <-> 79%, normal
    - 80% <-> 99%, amarelo
    - 100% -> X%, vermelho
3. Criar o controller do Report
4. Ajustar alguns batchs e manutenção dos dados (category ta realizando write/read para cada transaction que ela compoe, ao ser editada, solução: fazer um batch que lê tudo, altera tudo e salva tudo)
5. deixar o código completamente semantico
6. deixar a sidenav compativel com o mobile