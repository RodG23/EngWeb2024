# Erros detetados e respetivas alterações

## Ficheiro xml da Rua número 6:
- O nome da rua possuía um ' ' no início, causando problemas de ordenação alfabética.

## Ficheiro xml da Rua número 7:
- O nome da rua possuía um ' ' no início, causando problemas de ordenação alfabética.

## Ficheiro xml da Rua número 25:
- O atributo de um elemento do tipo entidade tem o nome de 'tipo', não 'entidade'. Assim sendo, o correto é, por exemplo, 'endidade tipo="pessoa"  e não 'endidade entidade="pessoa" .

## Ficheiro xml da Rua número 27:
- O atributo de um elemento do tipo entidade tem o nome de 'tipo', não 'entidade'. Assim sendo, o correto é, por exemplo, 'endidade tipo="pessoa"  e não 'endidade entidade="pessoa" .


## Ficheiro xml da Rua número 30:
- O atributo de um elemento do tipo entidade tem o nome de 'tipo', não 'entidade'. Assim sendo, o correto é, por exemplo, 'endidade tipo="pessoa"  e não 'endidade entidade="pessoa" .


## Ficheiro xml da Rua número 43:
- Os elementos de uma casa devem aparecer em sequência, do seguinte modo: número (obrigatório), efiteuta(opcional), foro(opcional), desc(opcional), vista(opcional).
- Neste ficheiro, os elementos existentes no elemento pai(casa) não se encontram corretamente ordenados, pelo que não satisfazem os princípios do ficheiro xsd.
- Para corrigir, bastou ordenar as linhas.

Após corrigir todos estes erros, o programa validation.py verificou que todos os xml estão válidos, de acordo com o xsd(XML Schema Definition) dado.

