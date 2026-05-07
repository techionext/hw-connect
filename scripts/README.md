# Scripts de Automação

## Create Use Case

Script para automatizar a criação de use cases baseado no template existente.

### Uso

```bash
npm run create-use-case <caminho>
```

### Exemplos

```bash
# Criar um use case Users/Create
npm run create-use-case Users/Create

# Criar um use case Auth/Login
npm run create-use-case Auth/Login

# Criar um use case Products/Update
npm run create-use-case Products/Update
```

### O que o script faz

1. **Analisa o caminho**: Converte `Users/Create` em:
   - Nome da classe: `UsersCreate`
   - Nome do arquivo: `usersCreate`
   - Caminho: `src/UseCases/Users/Create/`

2. **Cria a estrutura de diretórios**:
   ```
   src/UseCases/Users/Create/
   ├── UsersCreate.UseCase.ts
   ├── UsersCreate.Controller.ts
   ├── UsersCreate.Swagger.ts
   └── Schema/
       ├── UsersCreate.Schema.Request.ts
       └── UsersCreate.Schema.Response.ts
   ```

3. **Adapta os arquivos do template**:
   - Substitui `REPLACE` pelo nome da classe (ex: `UsersCreate`)
   - Substitui `REPOSITORY` por `UsersCreateRepository`
   - Substitui `IREPOSITORY` por `IUsersCreateRepository`

### Arquivos gerados

- **UseCase**: Contém a lógica principal do use case
- **Controller**: Gerencia as requisições HTTP
- **Swagger**: Documentação da API
- **Schema Request**: Validação dos dados de entrada
- **Schema Response**: Definição da resposta

### Próximos passos após criação

1. Implementar a lógica no arquivo `.UseCase.ts`
2. Configurar os schemas de request/response
3. Adicionar a rota no sistema de rotas
4. Registrar o controller no container de DI

### Convenções de nomenclatura

- **Caminho**: `Users/Create` → `src/UseCases/Users/Create/`
- **Classe**: `Users/Create` → `UsersCreate`
- **Arquivo**: `Users/Create` → `UsersCreate`
- **Repository**: `Users` → `UsersRepository` (usa apenas a primeira parte)
- **Interface**: `Users` → `IUsersRepository` (usa apenas a primeira parte)

### Exemplos de conversão

| Input | Classe | Arquivo | Repository | Caminho |
|-------|--------|---------|------------|---------|
| `Users/Create` | `UsersCreate` | `UsersCreate` | `UsersRepository` | `src/UseCases/Users/Create/` |
| `Auth/Login` | `AuthLogin` | `AuthLogin` | `AuthRepository` | `src/UseCases/Auth/Login/` |
| `Products/Update` | `ProductsUpdate` | `ProductsUpdate` | `ProductsRepository` | `src/UseCases/Products/Update/` |

# Scripts de Geração

Este diretório contém scripts para gerar código automaticamente baseado em templates.

## generate-repository.ts

Script para gerar repositórios dinamicamente baseado no template em `template/Repository`. Suporta repositórios simples e aninhados.

### Uso

```bash
npx tsx scripts/generate-repository.ts <caminho-da-entidade>
```

### Exemplos

```bash
# Repositório simples
npx tsx scripts/generate-repository.ts User
npx tsx scripts/generate-repository.ts Product

# Repositório aninhado (cria Managers/)
npx tsx scripts/generate-repository.ts User/Magiclink
npx tsx scripts/generate-repository.ts Product/Inventory
npx tsx scripts/generate-repository.ts User/Notification
```

### O que o script faz

#### Para repositórios simples (ex: User):
1. **Cria a pasta**: `src/Repositories/User/`
2. **Gera os arquivos**:
   - `RepositoryUser.ts` - Implementação do repositório
   - `RepositoryUserDTO.ts` - Interfaces e tipos DTO

#### Para repositórios aninhados (ex: User/Magiclink):
1. **Cria a estrutura**: `src/Repositories/User/Managers/Magiclink/`
2. **Gera os arquivos**:
   - `RepositoryUserMagiclink.ts` - Implementação do repositório
   - `RepositoryUserMagiclinkDTO.ts` - Interfaces e tipos DTO
3. **Atualiza automaticamente o repositório pai**:
   - Adiciona import do novo repositório
   - Adiciona `@injectable()` se não existir
   - Adiciona propriedade na interface pai
   - Adiciona parâmetro no constructor

### Substituições automáticas

- `ENTITY` → `<EntityName>` (capitalizado)
- `entity` → `<entityName>` (lowercase)
- Para aninhados: `User/Magiclink` → `ENTITY` vira `UserMagiclink`, `entity` vira `magiclink`

### Estruturas geradas

#### Repositório simples:
```
src/Repositories/User/
├── RepositoryUser.ts
└── RepositoryUserDTO.ts
```

#### Repositório aninhado:
```
src/Repositories/User/
├── RepositoryUser.ts (atualizado automaticamente)
├── IRepositoryUser.ts (atualizado automaticamente)
└── Managers/
    └── Magiclink/
        ├── RepositoryUserMagiclink.ts
        └── RepositoryUserMagiclinkDTO.ts
```

### Características

- ✅ **Caminhos dinâmicos**: Usa `process.cwd()` para funcionar em qualquer ambiente
- ✅ **Substituições inteligentes**: Mantém a consistência de nomenclatura
- ✅ **Validações**: Verifica se os templates existem antes de executar
- ✅ **Feedback visual**: Mostra o progresso e resultado da geração
- ✅ **Reutilização**: Pode ser executado múltiplas vezes (sobrescreve arquivos existentes)

### Dependências

- `tsx` - Para executar TypeScript diretamente
- `fs` e `path` - Para manipulação de arquivos (nativos do Node.js)

### Próximos passos após a geração

1. Implementar a lógica específica no repositório gerado
2. Configurar os schemas de Prisma correspondentes
3. Registrar o repositório no container de DI
4. Criar os use cases que utilizam este repositório
