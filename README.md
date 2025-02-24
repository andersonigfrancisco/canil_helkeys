# 📘 Sistema de Gestão de Adoção e Vendas - Canil Helkeys

Este projeto é um sistema de gestão para adoção de animais e vendas, desenvolvido utilizando **NestJS**, **Prisma** e **PostgreSQL**.

## 📌 Estrutura do Banco de Dados

O banco de dados contém cinco tabelas principais: **Usuários**, **Espécies**, **Raças**, **Animais** e **Vendas**. Abaixo está a descrição de cada tabela e suas propriedades.

---

### 🧑‍💼 **Tabela `users` (Usuários)**  
Armazena os dados dos usuários do sistema.

| Propriedade  | Tipo       | Descrição |
|-------------|-----------|-----------|
| `id`        | `String`  | Identificador único do usuário (UUID). |
| `name`      | `String`  | Nome do usuário. |
| `email`     | `String`  | E-mail do usuário (único no sistema). |
| `password`  | `String`  | Senha do usuário. |
| `role`      | `Role`    | Função do usuário no sistema (ADMIN, ADOPTER, DONOR). Por padrão, é `USER`. |
| `donations` | `Animal[]` | Lista de animais doados pelo usuário. |
| `adoptions` | `Animal[]` | Lista de animais adotados pelo usuário. |
| `customer`  | `Sale[]`   | Lista de vendas feitas para o usuário. |
| `createdAt` | `DateTime` | Data de criação do registro. |
| `updatedAt` | `DateTime?` | Data da última atualização do registro. |

#### **Enumeração `Role` (Papel do Usuário):**  
Define os tipos de usuários no sistema:  
- `ADMIN` → Administrador do sistema.  
- `ADOPTER` → Pessoa que adota animais.  
- `DONOR` → Pessoa que doa animais. 
- `USER` → Pessoa que trabalha no  Canil Helkeys.   
- `CUSTOMER` → Pessoa que compra um animal no  Canil Helkeys.   

---

### 🦴 **Tabela `species` (Espécies)**  
Armazena as espécies de animais disponíveis no sistema.

| Propriedade  | Tipo       | Descrição |
|-------------|-----------|-----------|
| `id`        | `String`  | Identificador único da espécie (UUID). |
| `name`      | `String`  | Nome da espécie (cachorro, gato, etc.). |

---

### 🏅 **Tabela `breeds` (Raças)**  
Armazena as raças disponíveis para cada espécie de animal.

| Propriedade  | Tipo       | Descrição |
|-------------|-----------|-----------|
| `id`        | `String`  | Identificador único da raça (UUID). |
| `name`      | `String`  | Nome da raça (Labrador, Siamês, etc.). |
| `speciesId` | `String`  | ID da espécie à qual essa raça pertence. |

---

### 🐾 **Tabela `animals` (Animais)**  
Armazena os dados dos animais disponíveis para adoção ou doação.

| Propriedade  | Tipo       | Descrição |
|-------------|-----------|-----------|
| `id`        | `String`  | Identificador único do animal (UUID). |
| `name`      | `String`  | Nome do animal. |
| `breedId`   | `String?` | ID da raça do animal (opcional). |
| `age`       | `Int`     | Idade do animal (em anos). |
| `adopted`   | `Boolean` | Indica se o animal já foi adotado (`false` por padrão). |
| `donorId`   | `String?` | ID do usuário que doou o animal (opcional). |
| `adopterId` | `String?` | ID do usuário que adotou o animal (opcional). |
| `createdAt` | `DateTime` | Data de criação do registro. |
| `updatedAt` | `DateTime` | Data da última atualização do registro. |

#### **Relacionamentos:**   
- `breed` → Relaciona o animal à sua raça.  
- `donor` → Relaciona o animal a um usuário que o doou.  
- `adopter` → Relaciona o animal a um usuário que o adotou.  

---

### 💰 **Tabela `sales` (Vendas)**  
Armazena as vendas realizadas para os clientes (usuários).

| Propriedade  | Tipo       | Descrição |
|-------------|-----------|-----------|
| `id`        | `String`  | Identificador único da venda (UUID). |
| `price`     | `Float`   | Preço total da venda. |
| `customerId`| `String`  | ID do usuário que comprou o produto. |
| `animalId`  | `String?` | ID do animal vendido (opcional). |
| `createdAt` | `DateTime`| Data de criação do registro. |

#### **Relacionamentos:**  
- `customer` → Relaciona a venda ao usuário que comprou o produto.  
- `animal` → Relaciona a venda a um animal, caso seja uma venda de adoção paga.  

---

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework para desenvolvimento da API.
- **Prisma ORM** - Mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- **PostgreSQL** - Banco de dados relacional utilizado no projeto.
- **Swagger** - Para documentação da API REST.

## 📌 Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/andersonigfrancisco/canil_helkeys
   ```

2. Acesse o diretório do projeto:
   ```sh
   cd seu-repositorio
   ```

3. Instale as dependências usando o **pnpm**:
   ```sh
   pnpm install
   ```

4. Configure o banco de dados PostgreSQL e adicione a URL no arquivo `.env`:
   ```sh
   DATABASE_URL="postgresql://postgres:docker@localhost:5432/canil_helkeys"
   PORT=3333
   NODE_ENV=dev
   JWT_SECRET=""
   JWT_PRIVATE_KEY=
   ```

5. Execute as migrações do banco de dados:
   ```sh
   pnpm prisma migrate dev
   ```

6. Inicie o servidor:
   ```sh
   pnpm start:dev
   ```

7. Acesse a documentação da API no navegador:
   ```
   http://localhost:3333/api
   ```

---



---