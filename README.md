# Fullstack Employment Data App

Este projeto é dividido entre frontend (React) e backend (Node.js), organizados em pastas separadas.

Ao invés de consultar diretamente a API do exercício no frontend, optei por estruturar um backend dedicado para demonstrar minha capacidade como desenvolvedor fullstack.

Para agregar valor ao backend, criei um serviço chamado CensusBureau, que encapsula o consumo da API externa. Isso reduz o acoplamento com a dependência externa através de injeção de dependência, além de permitir a implementação de testes de integração específicos para esse serviço.

O backend expõe um endpoint /employment que:

- Consulta os dados da API do Census Bureau;
- Faz o parse dos dados para um formato mais adequado ao frontend;
- Cacheia os resultados em memória para evitar chamadas repetidas.

## Como instalar e rodar o projeto

Os projetos devem ser rodados em terminais separados.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

As variáveis de ambiente podem ser trocadas criando ou renomeando example.env para .env e trocando os seus valores.

Por padrão o backend está rodando na porta 3000 e o frontend na porta 5173

## Trade-offs

### Por que os projetos estão em pastas separadas?

Em um cenário real imagino que seria mais interessante ter os projetos separados em seus respectivos repositórios. Para facilitar o desenvolvimento do exercício e acesso dos avaliadores eu decidi deixá-los em um mesmo repositório porém em pastas diferentes e com seus respectivos package.json.

### Por que não foi incluído scripts para rodar ambos projetos apartir da raiz do repositório?

Tanto por questão de tempo disponível para o teste quanto para evitar potenciais problemas pelos avaliadores ao rodarem o projeto. Já tive problemas com scripts como o pacote NPM "concurrently" ao rodá-lo em sistemas operacionais diferentes. Caso o projeto fosse um monolito com o frontend e backend rodando simultaneamente a minha recomendação seria o uso de docker.
