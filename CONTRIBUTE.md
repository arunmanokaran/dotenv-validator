# Contributing to dotenv-guard-ts

First of all, thanks for taking the time to contribute 🙌  
Whether it's fixing a bug, improving documentation, or suggesting a new feature — every contribution is valuable.

---

## 📌 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Development Workflow](#development-workflow)
- [Running Tests](#running-tests)
- [Coding Guidelines](#coding-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## 🧭 Code of Conduct

Please be respectful and constructive in all interactions.  
We aim to maintain a welcoming and collaborative environment.

---

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/dotenv-guard-ts.git
cd dotenv-guard-ts
```

---

## Install dependencies:

```bash
npm install
```

---

## Project Setup

Project structure:

```bash
src/
createEnv.ts
parseValue.ts
types.ts
tests/
```

---

## Build the project:

```bash
npm run build
```

---

## Development Workflow

Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

Make your changes
Run tests:

```bash
npm test
```

Ensure all tests pass and coverage remains at 100%

---

## Running Tests

We use Jest for testing.

```bash
npm test
```

---

## To check coverage:

```bash
npm test -- --coverage
```

## Important

- All new code must include tests
- Do not reduce coverage below 100%
- Cover edge cases (invalid inputs, errors, etc.)

---

## Coding Guidelines

- Use TypeScript
- Keep functions small and focused
- Avoid using any unless absolutely necessary
- Prefer clear and explicit logic over clever shortcuts
- Write meaningful variable and function names

---

## Commit Guidelines

Follow a simple and consistent commit format:

```bash
type: short description
```

---

## Examples:

```bash
feat: add enum validation support
fix: handle empty string as missing value
test: add coverage for strict mode
docs: update README examples
```

---

## Pull Request Process

Ensure your branch is up to date:

```bash
git pull origin main
```

Push your changes:

```bash
git push origin feature/your-feature-name
```

Open a Pull Request

---

## PR Requirements

- Clear description of what was changed
- Reference related issues (if any)
- All tests passing
- No drop in coverage
- Code follows project guidelines

---

## Reporting Issues

When creating an issue, include:

- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment (Node version, OS, etc.)

---

## Suggesting Features

If you have an idea:

- Explain the use case clearly
- Provide example usage if possible
- Keep it aligned with the project’s scope

---

## Contribution Scope

Good contributions include:

- Bug fixes
- Performance improvements
- Better error messages
- Documentation improvements
- Test coverage improvements
