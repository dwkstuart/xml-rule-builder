# Publishing Guide for XML Rule Builder

This document outlines the staged approach for publishing the `xml-rule-builder` package to npm.

## Prerequisites

Before publishing, ensure you have:

1. **npm account**: Create an account at https://www.npmjs.com/
2. **npm login**: Run `npm login` in your terminal
3. **GitHub repository**: Set up a public repository for the project
4. **Updated package.json**: Ensure all metadata is correct

## Publishing Stages

### Stage 1: Preparation ✅

**Goal**: Set up publishing infrastructure and ensure code quality

**Tasks**:
- [x] Update package.json with publishing scripts
- [x] Add repository metadata
- [x] Set up build and test scripts
- [x] Configure files to include in package
- [ ] Update author information in package.json
- [ ] Update repository URLs in package.json
- [ ] Set up GitHub repository
- [ ] Add .npmignore if needed

**Commands**:
```bash
# Update author and repository info
npm pkg set author="Your Name <your.email@example.com>"
npm pkg set repository.url="https://github.com/yourusername/xml-rule-builder.git"

# Test build process
npm run build:clean
npm run lint
npm run test
```

### Stage 2: Alpha Release (0.1.0-alpha.1)

**Goal**: Internal testing and validation

**Tasks**:
- [ ] Create alpha tag
- [ ] Publish with alpha tag
- [ ] Test installation and basic functionality
- [ ] Validate TypeScript types
- [ ] Test React component integration

**Commands**:
```bash
# Create alpha version
npm version prerelease --preid=alpha

# Publish alpha version
npm run publish:alpha

# Test installation
npm install xml-rule-builder@alpha
```

**Testing Checklist**:
- [ ] Package installs without errors
- [ ] TypeScript types are available
- [ ] React components render correctly
- [ ] Core functions work as expected
- [ ] No console errors in browser

### Stage 3: Beta Release (0.1.0-beta.1)

**Goal**: Limited public testing

**Tasks**:
- [ ] Address any issues from alpha testing
- [ ] Create beta tag
- [ ] Publish with beta tag
- [ ] Share with select users for feedback
- [ ] Test in different environments

**Commands**:
```bash
# Create beta version
npm version prerelease --preid=beta

# Publish beta version
npm run publish:beta

# Test in different environments
npm install xml-rule-builder@beta
```

**Beta Testing Focus**:
- [ ] Cross-browser compatibility
- [ ] Different React versions
- [ ] Various build tools (webpack, vite, etc.)
- [ ] Performance testing
- [ ] Edge cases and error handling

### Stage 4: Production Release (1.0.0)

**Goal**: Full public release

**Tasks**:
- [ ] Address all beta feedback
- [ ] Final testing and validation
- [ ] Update documentation
- [ ] Create production release
- [ ] Announce release

**Commands**:
```bash
# Create production version
npm version major

# Publish to latest
npm run publish:latest

# Verify publication
npm view xml-rule-builder
```

## Version Management

### Semantic Versioning

- **Major (1.0.0)**: Breaking changes
- **Minor (1.1.0)**: New features, backward compatible
- **Patch (1.0.1)**: Bug fixes, backward compatible

### Pre-release Tags

- **Alpha**: `0.1.0-alpha.1` - Internal testing
- **Beta**: `0.1.0-beta.1` - Limited public testing
- **RC**: `1.0.0-rc.1` - Release candidate

## Publishing Commands

```bash
# Dry run (test without publishing)
npm run publish:dry-run

# Alpha release
npm run publish:alpha

# Beta release
npm run publish:beta

# Production release
npm run publish:latest

# Version management
npm run version:patch  # 1.0.0 -> 1.0.1
npm run version:minor  # 1.0.0 -> 1.1.0
npm run version:major  # 1.0.0 -> 2.0.0
```

## Quality Checks

Before each release, run:

```bash
# Build and test
npm run build:clean
npm run lint
npm run test

# Check package contents
npm pack --dry-run

# Verify TypeScript compilation
npx tsc --noEmit
```

## Post-Publishing Tasks

After each release:

1. **Update documentation**: Ensure README reflects current version
2. **Create GitHub release**: Tag and release notes
3. **Monitor feedback**: Watch for issues and feedback
4. **Plan next iteration**: Based on feedback and roadmap

## Troubleshooting

### Common Issues

1. **Package name already taken**: Check npm registry for availability
2. **Build errors**: Ensure all dependencies are properly configured
3. **TypeScript errors**: Verify all types are exported correctly
4. **Peer dependency warnings**: Test with different React versions

### Rollback Strategy

If issues are found after publishing:

```bash
# Unpublish specific version (within 72 hours)
npm unpublish xml-rule-builder@1.0.0

# Or deprecate version
npm deprecate xml-rule-builder@1.0.0 "This version has issues, please use 1.0.1"
```

## Next Steps

1. **Complete Stage 1**: Update author and repository information
2. **Set up GitHub repository**: Create public repo and push code
3. **Run alpha testing**: Publish first alpha version
4. **Gather feedback**: Test with real use cases
5. **Iterate**: Address feedback and improve

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [TypeScript Package Guidelines](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) 