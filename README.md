# Resumo
Sistema de contas bancárias em que é possível praticar ações comumente realizadas em modelos reais, também como algumas fora do escopo em intuito de demonstração da capacidade de funcionamento do código. 

# Tecnologias 
- Typescript.
- Express.
- Express-validator.
- PostgreSQL.
- Tsyringe.
- PrismaORM.
- Commitizen.
- Git.
- Docker.
- Outras **(`package.json` para dependências completas)**.

# Run
1. Instalar dependências: `yarn`
2. Subir o contêiner com o banco de dados em PostgreSQL: `docker compose up -d`
3. Inicializar o prismaORM: `yarn prisma migrate dev --name init`
4. Inicializar o servidor: `yarn dev`

# Rotas

**URLbase:** `http://localhost:3000/account`

## Criar conta
**Método:** POST
**URL:** URLbase
- **Body (JSON)**: name, cpf

## Buscar todas as contas
**Método:** GET
**URL:** URLbase
- **Header:** cpf

## Buscar uma conta
**Método:** GET
**URL:** URLbase/:id
- **Header:** cpf

## Deletar uma conta
**Método:** DELETE
**URL:** URLbase
- **Header:** cpf

## Atualizar uma conta
**Método:** PATCH
**URL:** URLbase
- **Header:** cpf
-  **Body (JSON)**: newCpf, newName

## Depositar dinheiro em uma conta
**Método:** POST
**URL:** URLbase/deposit
- **Header:** cpf
-  **Body (JSON)**: ammount

## Retirar dinheiro em uma conta
**Método:** POST
**URL:** URLbase/withdraw
- **Header:** cpf
-  **Body (JSON)**: ammount

## Transferir dinheiro para outra conta
**Método:** POST
**URL:** URLbase/transfer
- **Header:** cpf
-  **Body (JSON)**: toAccountCpf, ammount