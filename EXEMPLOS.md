# Exemplos de Requisições para Testar a API

## 🧪 Testando com cURL

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Mensagem de Boas-vindas
```bash
curl http://localhost:3000/
```

---

## 📂 CATEGORIAS

### 3. Listar Categorias (já vêm criadas por padrão)
```bash
curl http://localhost:3000/categories
```

### 4. Criar Nova Categoria
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Urgente",
    "description": "Tarefas com alta prioridade",
    "color": "#FF0000"
  }'
```

### 5. Buscar Categoria por ID
```bash
curl http://localhost:3000/categories/1
```

### 6. Atualizar Categoria
```bash
curl -X PUT http://localhost:3000/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "color": "#00FF00"
  }'
```

---

## ✅ TAREFAS

### 7. Criar Tarefas

**Tarefa com categoria "Estudos" (ID: 3):**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar NestJS",
    "description": "Aprender sobre módulos, controllers e services",
    "categoryId": "3"
  }'
```

**Tarefa com categoria "Trabalho" (ID: 2):**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar autenticação",
    "description": "Adicionar JWT ao projeto",
    "categoryId": "2"
  }'
```

**Tarefa com categoria "Pessoal" (ID: 1):**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fazer exercícios",
    "description": "Academia às 18h",
    "categoryId": "1"
  }'
```

**Tarefa sem categoria:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa geral",
    "description": "Sem categoria específica"
  }'
```

### 8. Listar Todas as Tarefas
```bash
curl http://localhost:3000/tasks
```

### 9. Buscar Tarefa por ID
```bash
curl http://localhost:3000/tasks/1
```

### 10. Buscar Tarefas por Categoria (INTERAÇÃO ENTRE MÓDULOS! ⭐)
```bash
# Listar tarefas da categoria "Estudos" (ID: 3)
curl http://localhost:3000/tasks/category/3

# Listar tarefas da categoria "Trabalho" (ID: 2)
curl http://localhost:3000/tasks/category/2
```

### 11. Atualizar Tarefa (marcar como concluída)
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### 12. Atualizar Tarefa (mudar de categoria)
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": "2"
  }'
```

### 13. Listar Tarefas Concluídas
```bash
curl http://localhost:3000/tasks/completed
```

### 14. Listar Tarefas Pendentes
```bash
curl http://localhost:3000/tasks/pending
```

### 15. Deletar Tarefa
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### 16. Deletar Categoria
```bash
curl -X DELETE http://localhost:3000/categories/1
```

---

## 🧪 Testando com HTTPie (alternativa mais legível)

Se você tiver o HTTPie instalado (`brew install httpie`):

```bash
# Listar categorias
http GET localhost:3000/categories

# Criar categoria
http POST localhost:3000/categories name="Urgente" description="Alta prioridade" color="#FF0000"

# Criar tarefa com categoria
http POST localhost:3000/tasks title="Estudar NestJS" description="Aprender o básico" categoryId="3"

# Listar tarefas de uma categoria
http GET localhost:3000/tasks/category/3

# Atualizar tarefa
http PUT localhost:3000/tasks/1 completed:=true

# Deletar tarefa
http DELETE localhost:3000/tasks/1
```

---

## 🧪 Testando com Postman/Insomnia

### Listar Categorias (GET)
- **URL**: `http://localhost:3000/categories`
- **Method**: GET

### Criar Categoria (POST)
- **URL**: `http://localhost:3000/categories`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "Urgente",
  "description": "Tarefas prioritárias",
  "color": "#FF0000"
}
```

### Criar Tarefa com Categoria (POST)
- **URL**: `http://localhost:3000/tasks`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "title": "Estudar NestJS",
  "description": "Aprender os conceitos básicos",
  "categoryId": "3"
}
```

### Listar Tarefas (GET)
- **URL**: `http://localhost:3000/tasks`
- **Method**: GET

### Buscar Tarefas por Categoria (GET) ⭐
- **URL**: `http://localhost:3000/tasks/category/3`
- **Method**: GET

### Atualizar Tarefa (PUT)
- **URL**: `http://localhost:3000/tasks/1`
- **Method**: PUT
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "completed": true
}
```

### Deletar Tarefa (DELETE)
- **URL**: `http://localhost:3000/tasks/1`
- **Method**: DELETE

---

---

## ⭐ DEMONSTRAÇÃO DE INTERAÇÃO ENTRE MÓDULOS

A interação entre módulos é um dos conceitos mais importantes do NestJS!

### Como funciona:

1. **TasksModule** importa **CategoriesModule**
2. **TasksService** injeta **CategoriesService** 
3. Quando você cria/atualiza uma tarefa com `categoryId`, o TasksService valida se a categoria existe usando o CategoriesService
4. O endpoint `/tasks/category/:categoryId` usa ambos os services

### Testando a validação:

```bash
# Isso funciona (categoria 3 existe)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa válida",
    "categoryId": "3"
  }'

# Isso retorna erro 400 (categoria 999 não existe)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa inválida",
    "categoryId": "999"
  }'
```

---

## ✅ Validações que Serão Testadas

### Título obrigatório
```bash
# Isso retornará erro 400
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Sem título"
  }'
```

### Título com menos de 3 caracteres
```bash
# Isso retornará erro 400
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AB"
  }'
```

### Tarefa não encontrada
```bash
# Isso retornará erro 404
curl http://localhost:3000/tasks/999
```

### Propriedade extra não permitida
```bash
# Isso retornará erro 400 (devido ao forbidNonWhitelisted)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "extraField": "não permitido"
  }'
```

### Categoria inválida (VALIDAÇÃO ENTRE MÓDULOS! ⭐)
```bash
# Isso retornará erro 400 (categoria não existe)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tarefa com categoria inválida",
    "categoryId": "999"
  }'
```

### Nome de categoria duplicado
```bash
# Isso retornará erro 400 (já existe categoria "Pessoal")
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pessoal"
  }'
```
