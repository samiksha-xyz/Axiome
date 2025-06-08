# Contributing to Axiome

Welcome to the Axiome algorithm learning platform! We're excited to have you contribute to this educational project.

## 🚀 Quick Start for Contributors

### Prerequisites
- GitHub account with access to samiksha-xyz organization
- Git configured locally
- Python 3.8+ and Node.js 18+ installed

### First-Time Setup
1. **Clone the repository** (as a team member, you can clone directly):
   ```bash
   git clone https://github.com/samiksha-xyz/Axiome.git
   cd Axiome
   ```

2. **Set up development environment**:
   ```bash
   # Backend setup (Python with uv)
   cd backend
   uv sync
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Frontend setup (Node.js)
   cd ../frontend
   npm install
   ```

## 📝 Contribution Workflow

### For Each New Feature/Fix:
1. **Start from main branch**:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make your changes** following our coding standards

4. **Test thoroughly**:
   ```bash
   # Backend tests
   cd backend && python -m pytest
   
   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "Add binary search tree visualization component"
   ```

6. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request** through GitHub web interface

### 📋 Pull Request Requirements
- [ ] **CLA signed** (required - bot will guide you)
- [ ] **Tests added/updated** for new functionality
- [ ] **Documentation updated** if needed
- [ ] **Code follows project style**
- [ ] **PR description explains what and why**
- [ ] **All status checks pass**

## 🤖 CLA (Contributor License Agreement)

**Required for all contributors.** When you create your first PR:

1. The CLA Assistant bot will comment on your PR
2. Read the [CLA document](../docs/CLA.md)  
3. Reply with exactly: `I have read the CLA Document and I hereby sign the CLA`
4. **This signature covers all your future contributions** - you only need to sign once!

The PR cannot be merged until the CLA is signed.

## 🏗️ Project Structure

```
Axiome/
├── backend/              # Python API and core algorithms
│   ├── algorithms/       # Algorithm implementations
│   ├── api/             # REST API endpoints
│   ├── tests/           # Backend tests
│   ├── pyproject.toml   # Python dependencies and config
│   └── uv.lock         # Lockfile for reproducible builds
├── frontend/            # Next.js React application
│   ├── components/      # React components
│   ├── pages/          # Next.js pages
│   ├── styles/         # CSS and styling
│   └── package.json    # Node.js dependencies
├── docs/               # Documentation and guides
├── .github/            # GitHub workflows and templates
└── README.md          # Project overview
```

## 📦 Dependency Management

### Adding/Updating Python Dependencies
```bash
cd backend
# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev pytest

# Update dependencies
uv sync --upgrade
```

### Important Notes
- **Never manually edit** `uv.lock` - let uv manage it
- **Always commit** both `pyproject.toml` and `uv.lock` when adding dependencies
- **Use `uv run`** instead of activating venv for commands

## 💻 Development Guidelines
- Follow **PEP 8** style guide
- Use **type hints** for function signatures
- Write **docstrings** for all functions and classes
- Use **pytest** for testing
- Manage dependencies with **uv** and `pyproject.toml`
- Never commit `uv.lock` changes unless adding/updating dependencies

### Frontend (Next.js/React)
- Use **functional components** with hooks
- Follow **ESLint** configuration
- Use **TypeScript** where possible
- Write **Jest/React Testing Library** tests

### General
- **Commit messages**: Use clear, descriptive messages
- **Branch naming**: `feature/description` or `fix/description`
- **Code review**: All PRs require maintainer approval

## 🧪 Testing Requirements

### Before submitting PR:
```bash
# Run all backend tests
cd backend
uv run pytest -v

# Run all frontend tests  
cd frontend
npm test

# Check code style
npm run lint
```

### Writing Tests
- **Backend**: Add tests in `backend/tests/`
- **Frontend**: Add tests alongside components
- **Coverage**: Aim for 80%+ test coverage on new code

## 💬 Communication & Support

### Daily Workflow
- **Assign yourself** to issues you're working on
- **Update progress** in issue comments
- **Ask questions** early - don't struggle in silence

### Getting Help
- **Tag @suhas** in PR or issue comments for questions
- **Check existing issues** for similar problems  
- **Read documentation** in `docs/` folder
- **Review recent PRs** to understand code patterns

### Issue Labels
- `good first issue` - Great for new contributors
- `help wanted` - Community contributions welcome
- `intern-friendly` - Suitable for intern projects
- `bug` - Something that needs fixing
- `enhancement` - New feature or improvement

## ⚡ Quick Commands Reference

```bash
# Development workflow
git checkout main && git pull origin main
git checkout -b feature/my-feature
# ... make changes ...
git add . && git commit -m "Clear description"
git push origin feature/my-feature
# Create PR through GitHub

# Testing
cd backend && uv run pytest
cd frontend && npm test && npm run lint

# Environment setup with uv
cd backend && uv sync && source .venv/bin/activate
cd frontend && npm install
```

## 🎯 Code Review Process

1. **Create PR** with clear title and description
2. **CLA bot** checks signature (sign if first contribution)
3. **Automated tests** run (must pass)
4. **Maintainer review** (usually @suhas)
5. **Address feedback** if any
6. **Merge** after approval and passing checks

## 🚨 Important Notes

- **Never commit sensitive data** (API keys, passwords, etc.)
- **Test on multiple browsers** for frontend changes
- **Document breaking changes** clearly in PR description
- **Keep PRs focused** - one feature/fix per PR
- **Respect the CLA** - required for all contributions

---

Ready to contribute? Look for issues labeled `good first issue` to get started! 🚀

**Questions?** Open an issue or tag @suhas for help.
