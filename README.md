# Resumo
Sistema de contas bancárias com 3 operações principais: depósito, saque e transferência. É possível a criação de usuários com suas validações e Auth. 

# Tecnologias 
- Typescript.
- Express.
- Express-validator.
- JWT.
- PostgreSQL.
- Tsyringe.
- PrismaORM.
- Swagger.
- Commitizen.
- Git.
- Docker.
- Outras **(`package.json` para dependências completas)**.

# Run
1. Instalar dependências: `yarn`
2. Subir o contêiner com o banco de dados em PostgreSQL: `yarn db:create`
3. Criar o banco com prismaORM: `yarn prisma:init`
4. Inicializar o servidor: `yarn dev`

**OBS.:**: `.env` exposto propositalmente ;).

# Rotas
Documentação com Swagger após inicializar o servidor encontra-se em: `http://localhost:3333/api-docs`

