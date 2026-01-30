# Contributing to WonderNot

Thank you for your interest in contributing to WonderNot! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand what behavior will and will not be tolerated.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- MongoDB (for local development)

### Setting Up Your Development Environment

1. **Fork the repository** to your GitHub account.

2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/<your-username>/WonderNot.git
   cd WonderNot
   ```

3. **Add the upstream repository** as a remote:
   ```bash
   git remote add upstream https://github.com/ghOst-vedant/WonderNot.git
   ```

4. **Install dependencies** for both client and server:
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

5. **Set up environment variables**:
   - Create a `.env` file in the server directory
   - Add required environment variables (see `.env.example` if available)

## How to Contribute

### Reporting Bugs
- Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml)
- Search existing issues to avoid duplicates
- Include detailed steps to reproduce the issue
- Provide environment information (OS, browser, Node version)

### Suggesting Features
- Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml)
- Clearly describe the feature and its benefits
- Explain why this feature would be useful to most users

### Asking Questions
- Use the [Question template](.github/ISSUE_TEMPLATE/question.yml)
- Check existing questions and documentation first
- Be specific and provide context

## Development Workflow

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**:
   - Write clear, concise code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:
   ```bash
   # Run client tests
   cd client
   npm run lint
   
   # Test server
   cd ../server
   npm start
   ```

4. **Commit your changes** (see [Commit Guidelines](#commit-guidelines))

5. **Keep your branch updated**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```

7. **Create a Pull Request** using the [PR template](.github/pull_request_template.md)

## Coding Standards

### General Guidelines
- Write clean, readable, and maintainable code
- Follow the existing code style in the project
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Avoid code duplication

### JavaScript/React Guidelines
- Use ES6+ features
- Use functional components and hooks (React)
- Follow React best practices
- Use PropTypes or TypeScript for type checking
- Keep components small and reusable

### CSS Guidelines
- Use Tailwind CSS utility classes when possible
- Follow BEM naming convention for custom CSS
- Maintain responsive design principles
- Ensure accessibility (proper contrast, semantic HTML)

### Backend Guidelines
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate user inputs
- Follow REST API best practices
- Write secure code (sanitize inputs, prevent injection attacks)

## Commit Guidelines

We follow conventional commit messages for clarity and consistency:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates

### Examples
```bash
feat(auth): add password reset functionality

fix(profile): correct avatar upload issue

docs(readme): update installation instructions

style(client): format code with prettier

refactor(api): simplify user controller logic
```

## Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - References the related issue(s)
   - Includes screenshots for UI changes
   - Passes all tests and linting
   - Follows the coding standards
   - Has no merge conflicts with the main branch

2. **Wait for review**:
   - Maintainers will review your PR
   - Address any requested changes
   - Be responsive to feedback

3. **After approval**:
   - Your PR will be merged by a maintainer
   - Delete your feature branch after merging

## Code Review Guidelines

### For Contributors
- Be open to feedback
- Respond promptly to review comments
- Don't take criticism personally
- Ask questions if something is unclear

### For Reviewers
- Be respectful and constructive
- Explain the reasoning behind suggestions
- Approve PRs that meet the standards
- Help contributors improve their code

## Getting Help

If you need help:
- Check the [README](README.md)
- Search existing [issues](https://github.com/ghOst-vedant/WonderNot/issues)
- Ask questions in [GitHub Discussions](https://github.com/ghOst-vedant/WonderNot/discussions)
- Reach out to maintainers

## Recognition

Contributors are recognized in:
- The project's README
- Release notes
- GitHub's contributors page

Thank you for contributing to WonderNot! 🎉
