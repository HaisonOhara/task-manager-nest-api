# 🗄️ Configuração do Banco de Dados MySQL

## Pré-requisitos

Para rodar esta aplicação, você precisa ter o MySQL instalado e rodando em sua máquina.

### Instalação do MySQL

**macOS (usando Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows:**
Baixe o instalador em: https://dev.mysql.com/downloads/installer/

## Configuração

### 1. Criar o banco de dados

Acesse o MySQL:
```bash
# macOS/Linux
mysql -u root -p

# Windows (use o MySQL Workbench ou cmd)
mysql -u root -p
```

Crie o banco de dados:
```sql
CREATE DATABASE nest_api_exemplo;
```

### 2. Configurar as credenciais

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do MySQL:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=nest_api_exemplo

PORT=3000
```

**IMPORTANTE:** O arquivo `.env` contém credenciais sensíveis e já está no `.gitignore` para não ser versionado.

### 3. Rodar a aplicação

```bash
npm run start:dev
```

O TypeORM irá automaticamente:
- Conectar ao banco de dados usando as credenciais do `.env`
- Criar as tabelas `categories` e `tasks` com seus relacionamentos
- Popular com 3 categorias padrão (Pessoal, Trabalho, Estudos)

## Estrutura do Banco de Dados

### Tabela: `categories`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária (gerada automaticamente) |
| name | VARCHAR(100) | Nome da categoria (único) |
| description | TEXT | Descrição da categoria |
| color | VARCHAR(50) | Cor em hex ou nome (ex: #FF5733) |
| created_at | TIMESTAMP | Data de criação |

### Tabela: `tasks`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Chave primária (gerada automaticamente) |
| title | VARCHAR(255) | Título da tarefa |
| description | TEXT | Descrição detalhada |
| completed | BOOLEAN | Status de conclusão (false por padrão) |
| category_id | UUID | Chave estrangeira para categories (nullable) |
| created_at | TIMESTAMP | Data de criação |

### Relacionamento

- **One-to-Many**: Uma categoria pode ter várias tarefas
- **Many-to-One**: Muitas tarefas podem pertencer a uma categoria
- **ON DELETE SET NULL**: Se uma categoria for deletada, o `category_id` das tarefas relacionadas será definido como NULL

## Verificando a Conexão

Se a conexão com o banco estiver correta, você verá algo como:

```
[Nest] LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] LOG [InstanceLoader] CategoriesModule dependencies initialized
[Nest] LOG [InstanceLoader] TasksModule dependencies initialized
```

Se houver erro de conexão, verifique:
1. O MySQL está rodando? (`brew services list` no macOS ou `sudo systemctl status mysql` no Linux)
2. As credenciais no `.env` estão corretas?
3. O banco de dados `nest_api_exemplo` foi criado?
4. O usuário tem permissão para acessar o banco?

## TypeORM Synchronize

A aplicação está configurada com `synchronize: true` no TypeORM, que:

✅ **Desenvolvimento**: Conveniente - cria/atualiza tabelas automaticamente
❌ **Produção**: NUNCA USE - pode causar perda de dados

Para produção, use **migrations** do TypeORM.

## Comandos Úteis do MySQL

```bash
# Listar bancos de dados
SHOW DATABASES;

# Conectar a um banco
USE nest_api_exemplo;

# Listar tabelas
SHOW TABLES;

# Ver estrutura de uma tabela
DESCRIBE tasks;
DESCRIBE categories;

# Ver dados de uma tabela
SELECT * FROM tasks;
SELECT * FROM categories;

# Sair do mysql
exit;
```

## Troubleshooting

### Erro: "Access denied for user"
Verifique a senha no arquivo `.env` e tente resetar a senha do usuário root:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nova_senha';
FLUSH PRIVILEGES;
```

### Erro: "Unknown database"
Crie o banco de dados manualmente:
```sql
CREATE DATABASE nest_api_exemplo;
```

### Erro: "Table already exists"
O TypeORM tentou criar tabelas que já existem. Isso geralmente não é um problema, mas se quiser recomeçar:
```sql
DROP DATABASE nest_api_exemplo;
CREATE DATABASE nest_api_exemplo;
```

### Erro: "Client does not support authentication protocol"
Se você tiver erro de autenticação, atualize o método de autenticação do MySQL:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha';
FLUSH PRIVILEGES;
```
