# Soluções Aplicadas

## 1. Refatoração do provisionamento de conteúdos

- Foi utilizado o padrão [Strategy](https://refactoring.guru/design-patterns/strategy) para fazer a construção do DTO para cada tipo, diminuindo a complexidade do método da service, encapsulando e isolando o processo de cada tipo além de permitir a adição de novos tipos de arquivos e conteúdos de forma organizada.

## 2. Melhoria do acesso ao Repositório

- Na classe [content.repository](src/content/repository/content.repository.ts) foi identificado o uso do parâmetro diretamente na query sem tratamento, foi utilizado a opção de sanitização da própria lib para resolver o problema.
- Foi criado uma [constante com o nomes de todas as tabelas do banco](src/database/tables.ts), incentivando o uso da mesma para evitar erro no nome das tabelas durante a criação de um repositório.
