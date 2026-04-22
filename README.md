# 🎓 Students Management Portal

Um portal moderno de gerenciamento de alunos e cursos construído com React, Vite, TypeScript e Firebase. Apresenta autenticação segura, gerenciamento de estado avançado e uma interface intuitiva com componentes reutilizáveis.

## 🌐 Demo Online
**[👉 VER PROJETO AO VIVO](https://students-management-portal-five.vercel.app/)**

## ✨ Características Principais

- 🔐 **Autenticação Firebase** - Login seguro com integração completa
- 📊 **Charts Dinâmicos** - Visualização de dados em tempo real com Recharts
- ♾️ **Infinite Scroll** - Carregamento progressivo de dados para melhor performance
- 🎨 **Tema Dinâmico** - Suporte a tema claro/escuro com persistência
- 📝 **Formulários Reaproveitáveis** - Componentes de formulário tipados e validados
- 🔄 **Otimistic Updates** - Interface responsiva com atualizações otimistas
- 🏷️ **Breadcrumb Dinâmico** - Navegação inteligente baseada em rotas
- 🌱 **Seeders** - Ferramentas para popular banco de dados com dados de teste

# 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 16+ e npm/yarn
- Conta Firebase (projeto configurado)
- Variáveis de ambiente configuradas

## Instalação

```ash
# 1. Clonar o repositório
git clone https://github.com/marquesmaycon/students-management-portal
cd students-management-portal

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
# Criar arquivo .env na raiz do projeto

# 4. Adicionar suas credenciais Firebase ao .env
VITE_FIREBASE_API_KEY=seu_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

### Desenvolvimento

```ash
# Iniciar servidor de desenvolvimento
npm run dev

# O projeto abrirá em http://localhost:5173
```

### Build para Produção

```ash
# Criar build otimizado
npm run build

# Preview do build
npm run preview
```

### Verificação de Código

```ash
# Executar linter
npm run lint
```

---

## 📦 Stack Tecnológico

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server

### State Management & Data Fetching
- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Componentes React reutilizáveis
- **Radix UI** - Primitivos de componentes acessíveis
- **Recharts** - Biblioteca de charts
- **Lucide React** - Ícones SVG

### Autenticação & Backend
- **Firebase** - Backend como serviço
  - Authentication
  - Firestore (banco de dados)

### Routing
- **React Router 7** - Roteamento declarativo

### Utilitários
- **Faker.js** - Geração de dados fake para testes
- **ESLint** - Linting
- **Prettier** - Code formatting

---

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── form/           # Componentes de formulário
│   ├── layout/         # Layouts (dashboard, auth)
│   ├── sidebar/        # Navegação lateral
│   └── ui/             # Componentes UI primitivos
├── features/           # Features (funcionalidades principais)
│   ├── auth/           # Autenticação
│   ├── students/       # Gerenciamento de alunos
│   ├── courses/        # Gerenciamento de cursos
│   ├── dashboard/      # Dashboard com charts
│   └── seed/           # Seeders
├── hooks/              # Custom React hooks
├── lib/                # Utilitários e configurações
├── pages/              # Páginas da aplicação
├── routes.ts           # Definição de rotas
└── main.tsx            # Ponto de entrada
```



## 🎯 Decisões Arquiteturais e Técnicas

### 📊 TanStack Query (React Query)

O TanStack Query é utilizado para gerenciamento de estado do servidor, trazendo benefícios como:

- **Sincronização automática** de dados entre cliente e servidor
- **Cache inteligente** reduzindo requisições desnecessárias
- **Devtools integrado** para debug em tempo real
- **Tratamento de erros robusto** com retry automático

```	typescript
// query-options.ts
export const studentListOptions = (search?: string) =>
  infiniteQueryOptions({
    queryKey: [key, search],
    queryFn: ({ pageParam }: { pageParam: NextParam }) =>
      listStudents(pageParam, search),
    initialPageParam: null,
    getNextPageParam: (lp) => lp.nextCursor,
  });
```



### ♾️ Infinite Query (Scroll Infinito)

Implementado para carregar alunos progressivamente conforme o usuário faz scroll:

- **Paginação baseada em cursor** para eficiência
- **Limite de 20 items por página** para performance
- **Estados de carregamento isolados** para melhor UX
- **Deduplicação automática** de dados pelo React Query



### ✅ Validação com Zod

Schemas Zod fortemente tipados garantem segurança de tipos em toda a aplicação:

```	typescript
// validation.ts
export const studentSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email(),
  age: z.coerce
    .number<number>("A idade deve ser um número")
    .int("A idade deve ser um número inteiro")
    .min(18, "A idade deve ser pelo menos 18")
    .max(100, "A idade não pode ser maior que 100"),
  courseId: z.string().min(1, "O curso é obrigatório"),
  courseName: z.string().min(1, "O curso é obrigatório"),
});

export type Student = z.infer<typeof studentSchema>;
```



### 🔄 Otimistic Updates

Implementado para operações de criação, atualização e deleção, proporcionando:

- Interface responsiva com feedback instantâneo
- Melhor percepção de performance
- Fallback automático em caso de erro
- Invalidação e re-fetch automáticos após sucesso



### 🧩 Componentes Reutilizáveis de Formulário

Factory functions criam componentes tipados e reutilizáveis com:

- Type safety completo
- Reutilização máxima de código
- Validação integrada
- Mensagens de erro automáticas

```	typescript
const StudentInput = createInputField<StudentSchema>();
const StudentSelect = createSelectField<StudentSchema>();

<StudentInput name="name" label="Nome" placeholder="João Silva" />
<StudentSelect name="courseId" label="Curso" options={courses} />
```



### 🔐 Autenticação Firebase

Integração completa com Firebase Authentication fornecendo:

- Sign in com email/senha
- Persistência de sessão
- Logout com limpeza do cache
- Loading state durante verificação
- Protected routes automáticas



### 🔄 Converters do Firestore

Transformação de dados entre Firestore e aplicação com:

- Validação automática com Zod
- Timestamps do servidor sincronizados
- Type safety em ambos os sentidos
- Separação de concerns clara
- Fácil manutenção

```	typescript
export const studentConverter: FirestoreDataConverter<Student> = {
  toFirestore(student) {
    const parsed = studentSchema.parse(student);
    return {
      ...parsed,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return studentWithIdSchema.parse({ id: snapshot.id, ...data });
  },
};
```



### 📈 Query e Mutation Options

Centralização de configurações reutilizáveis para:

- DRY - Don't Repeat Yourself
- Consistência em toda a app
- Efeitos colaterais centralizados
- Fácil de testar
- Reusabilidade máxima



### 📊 Charts Dinâmicos com Dados Reais

Visualização de dados em tempo real com Recharts oferecendo:

- Filtro por período (7d, 30d, 90d, etc)
- Responsivo (mobile/desktop)
- Dados em tempo real do Firestore
- Gerador de dados dinâmicos por curso
- Formatação automática de datas



### 🌱 Seeders para Dados de Teste

Ferramentas para popular o banco com dados realistas:

- Uso de Faker.js para dados realistas
- Batch write para performance
- 400+ alunos pré-configurados
- Datas distribuídas nos últimos 90 dias
- Relacionamento com cursos reais

**Como usar:**
1. Importar no console ou criar página de admin
2. Executar \studentSeeder()\ ou \courseSeeder()\
3. Validar dados no Firestore Console



### 🏷️ Breadcrumb Dinâmico

Navegação inteligente que se adapta às rotas com:

- Geração automática baseada em rotas
- Traduções customizáveis
- Exibição de nomes de entidades (aluno, curso)
- Links interativos
- Sem configuração extra em rotas

**Exemplo de navegação:**
```
Início / Alunos / João Silva
Início / Cursos / React Avançado / Novo
```



## 🎨 Tema Dinâmico

Suporte a tema claro/escuro com:

- Detecção automática de preferência do sistema
- Persistência no localStorage
- Transição suave entre temas
- Integração com Tailwind CSS



## 🔍 Boas Práticas Implementadas

✅ **Type Safety** - TypeScript em todo o código  
✅ **Validação de Schemas** - Zod para runtime + compile time  
✅ **Separation of Concerns** - Features isoladas e reutilizáveis  
✅ **DRY Principle** - Query/Mutation options centralizadas  
✅ **Performance** - Infinite scroll, cache inteligente, memoização  
✅ **UX** - Otimistic updates, loading states, error handling  
✅ **Acessibilidade** - Radix UI primitivos, ARIA labels  
✅ **Código Limpo** - ESLint, Prettier, componentes bem estruturados  



## 📱 Responsividade

A aplicação é totalmente responsiva com:

- Breakpoints Tailwind CSS customizados
- Hook \useIsMobile\ para ajustes de UX
- Componentes adaptáveis (charts, tables, forms)
- Sidebar retrátil em mobile
- Touch-friendly componentes

### Debug com Devtools

```ash
# React Query Devtools já está integrado
# Acesse no canto inferior direito durante desenvolvimento
```

## 📋 Checklist de Funcionalidades

- [x] Autenticação com Firebase
- [x] CRUD completo de alunos
- [x] CRUD completo de cursos
- [x] Infinite scroll em listagens
- [x] Charts dinâmicos
- [x] Tema dinâmico
- [x] Breadcrumb dinâmico
- [x] Validações robustas
- [x] Otimistic updates
- [x] Seeders para popular o projeto
- [x] Responsividade completa
- [x] Componentes reutilizáveis

---

## 📚 Referências e Recursos

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [React Router](https://reactrouter.com/)

# 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

  ### Feito com ❤️ e muita 🎵
</div>
