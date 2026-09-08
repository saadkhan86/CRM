# Contributing to CRM Backend

Thank you for your interest in contributing to the CRM Backend System! We appreciate your support in making this project better.

---

## 🚀 Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/CRM.git
   cd CRM
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Environment Setup**:
   Copy `.example.env` to `.env` and configure your local variables:
   ```bash
   cp .example.env .env
   ```

---

## 🌿 Branching Strategy

Always create a new branch from `main` with a descriptive prefix:

- `feat/<feature-name>`: For new features
- `fix/<bug-name>`: For bug fixes
- `refactor/<module-name>`: For code improvements and cleanups
- `docs/<topic>`: For documentation changes

Example:
```bash
git checkout -b feat/add-activity-filters
```

---

## 📝 Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` Introduces a new feature
- `fix:` Fixes a bug
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `docs:` Documentation only changes
- `chore:` Changes to build process or tooling

Example:
```bash
git commit -m "feat(deals): add pipeline stage transition audit"
```

---

## 🛡️ Architecture & Coding Standards

1. **Layered Architecture**:
   - **Routes**: Define endpoints and apply middleware.
   - **Controllers**: Parse input, call services, format `ApiResponse`.
   - **Services**: Execute core business logic.
   - **Repositories**: Direct database interaction via Mongoose models.
2. **Error Handling**:
   - Use `ErrorHandler` (`ErrorHandler.badRequest`, `ErrorHandler.notFound`, etc.) or let `GlobalErrorHandler` catch and normalize database errors.
3. **API Response Format**:
   - Return standard responses using `ApiResponse.success(res, data)` or `ApiResponse.paginated(...)`.
4. **Type Safety**:
   - Always run `npx tsc --noEmit` before submitting a pull request to ensure all TypeScript types pass.

---

## 🔄 Pull Request Checklist

Before submitting your PR:
- [ ] Code compiles cleanly without TypeScript errors (`npx tsc --noEmit`).
- [ ] Sensitive keys and `.env` credentials are NOT committed.
- [ ] Branch is rebased against latest `main`.
- [ ] Meaningful commit messages are provided.
