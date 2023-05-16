# API Gerenciador de Preços

Este é o back-end do Gerenciador de Preços, uma API REST desenvolvida com Node.js, Express.js e Typescript. A API pode receber arquivos .csv, transformar os dados para json, validar os dados e atualizar os preços no banco de dados.

## Índice

- [Instalação](#instalação)
- [Como usar](#como-usar)
- [API](#api)
- [Ferramentas utilizadas](#ferramentas-utilizadas)
- [Licença](#licença)

## Instalação

Para instalar a aplicação, siga as seguintes etapas:

1. Crie um diretório para o projeto;
2. Clone esse repositório;

```
git clone https://github.com/savioferraz/price-manager-back.git
```

3. Instale as dependências (Certifique-se de ter o Node.js instalado);

```
npm i
```

4. Inicie a aplicação;

```
npm start
```

5. A API ficará disponível em sua máquina local na seguinte porta;

```
http://localhost:5000/
```

## Como usar

1. Faça requisições HTTP para os endpoints disponíveis conforme documentação abaixo.
2. Utilize as rotas e parâmetros especificados para interagir com a API.

### Formato do .csv

O arquivo .csv (comma separated values) deve conter o cabeçalho e tipo de dados separados por "," exatamente como no exemplo a seguit:

| product_code | new_price |
| ------------ | --------- |
| number       | number    |

### Regras de negócio

A API somente irá permitir a atualização no banco de dados se os novos preços seguirem as seguintes regras:

1. O arquivo csv deve conter um código de produto válido;
2. O novo preço não pode ser menor que o preço de custo do produto;
3. A diferença de preços não pode ser maior nem menor que 10% do valor original;
4. A atualização no banco de dados somente será aceita caso TODOS os itens do csv atendam as regras;
5. A API se encarrega de atualizar automaticamente itens vendidos em pacotes de acordo com suas quantidades.

## API

### Rota /stock

#### Endpoint /validate

Converte o arquivo csv para json, aplica as regras de validação e devolve um objeto seguindo o formato:

```
[
  {
    "productCode": "string",
    "productName": "string",
    "salesPrice": number,
    "costPrice": number,
    "newPrice": number,
    "diff": number,
    "status": "string"
  }
]
```

#### Endpoint /update

Aplica as mesmas validações de regra de negócio e atualiza os preços dos produtos.

## Ferramentas Utilizadas

- Node.js
- Typescript
- Express
- Postgres
- Prisma ORM
- Multer
- Csv-parser

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
