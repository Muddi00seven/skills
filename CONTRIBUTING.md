# Contributing to Cube A Labs Skills

Thank you for your interest in contributing! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

Found a bug? Please [open an issue](https://github.com/Muddi00seven/skills/issues/new) with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Framework and versions
- Error messages or screenshots

### Suggesting Features

Have an idea? [Open a feature request](https://github.com/Muddi00seven/skills/issues/new?labels=enhancement) with:

- Clear use case
- Why it's useful
- How it should work
- Examples if possible

### Submitting Changes

1. **Fork the repository**
   ```bash
   gh repo fork Muddi00seven/skills
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skills.git
   cd skills
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

6. **Build and test**
   ```bash
   npm run build
   npm test
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` formatting changes
   - `refactor:` code refactoring
   - `test:` adding tests
   - `chore:` maintenance tasks

8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Describe your changes
   - Reference any related issues

## Development Setup

### Project Structure

```
skills/
├── packages/
│   ├── favicon/          # Favicon generator
│   ├── cube-ui/          # UI component generator
│   └── sitemap/          # Sitemap generator
├── mcp-server/           # MCP server
└── .claude/              # Skill definitions
```

### Working on Skills

Skills are defined in markdown files:
- Original: `.claude/commands/*.md`
- Package: `packages/*/skill.md`

Edit both when making changes.

### Working on MCP Server

```bash
cd mcp-server
npm run dev  # Watch mode
```

Test the server:

```bash
node dist/index.js
```

### Adding a New Skill

1. Create skill markdown in `.claude/commands/new-skill.md`
2. Create package directory: `packages/new-skill/`
3. Add `package.json` and `README.md`
4. Copy skill to `packages/new-skill/skill.md`
5. Update MCP server to include the skill
6. Update root README.md

## Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: 2 spaces, semicolons
- **Naming**: camelCase for variables, PascalCase for types
- **Comments**: Explain "why", not "what"

## Testing

### Manual Testing

Test skills with Claude Code:

1. Build the project: `npm run build`
2. Install MCP server locally: `npm link` in `mcp-server/`
3. Configure Claude Code to use local server
4. Test each skill

### Framework Testing

Test each skill with multiple frameworks:
- Next.js (App & Pages Router)
- React (Vite)
- Vue 3
- Angular
- Svelte

## Documentation

- Keep README.md up to date
- Add examples for new features
- Document breaking changes
- Update package versions

## Pull Request Guidelines

**Good PRs:**
- ✅ Single focused change
- ✅ Clear description
- ✅ Tests included (if applicable)
- ✅ Documentation updated
- ✅ No unrelated changes

**Avoid:**
- ❌ Multiple unrelated changes
- ❌ Formatting-only commits in feature PRs
- ❌ Breaking changes without discussion
- ❌ Large refactors without prior issue

## Community

- Be respectful and inclusive
- Help others learn
- Give constructive feedback
- Celebrate contributions

## Questions?

- [Open a Discussion](https://github.com/Muddi00seven/skills/discussions)
- [Ask in Issues](https://github.com/Muddi00seven/skills/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Cube A Labs! 🚀
