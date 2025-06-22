# Release Checklist

Use this checklist for each release stage (Alpha, Beta, Production).

## Pre-Release Checklist

### Code Quality
- [ ] All tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] No console errors in browser
- [ ] All TypeScript types are properly exported

### Documentation
- [ ] README.md is up to date
- [ ] API documentation is current
- [ ] Examples are working
- [ ] Installation instructions are correct
- [ ] Changelog is updated

### Package Configuration
- [ ] package.json version is correct
- [ ] All dependencies are properly configured
- [ ] Files array includes necessary files
- [ ] Repository URLs are correct
- [ ] Author information is accurate

### Testing
- [ ] Package installs without errors
- [ ] TypeScript types are available
- [ ] React components render correctly
- [ ] Core functions work as expected
- [ ] Cross-browser compatibility verified
- [ ] Different React versions tested

## Alpha Release Checklist

### Before Publishing
- [ ] Version is set to alpha (e.g., `0.1.0-alpha.1`)
- [ ] All pre-release checks completed
- [ ] Local testing completed

### Publishing
- [ ] Run `npm run publish:alpha`
- [ ] Verify package appears on npm with alpha tag
- [ ] Test installation: `npm install xml-rule-builder@alpha`

### Post-Publishing
- [ ] Test in a new project
- [ ] Verify TypeScript integration
- [ ] Check React component functionality
- [ ] Document any issues found

## Beta Release Checklist

### Before Publishing
- [ ] Address all alpha feedback
- [ ] Version is set to beta (e.g., `0.1.0-beta.1`)
- [ ] All pre-release checks completed
- [ ] Alpha issues resolved

### Publishing
- [ ] Run `npm run publish:beta`
- [ ] Verify package appears on npm with beta tag
- [ ] Test installation: `npm install xml-rule-builder@beta`

### Post-Publishing
- [ ] Share with select users for feedback
- [ ] Test in different environments
- [ ] Performance testing completed
- [ ] Edge cases tested

## Production Release Checklist

### Before Publishing
- [ ] Address all beta feedback
- [ ] Version is set to production (e.g., `1.0.0`)
- [ ] All pre-release checks completed
- [ ] Final testing completed

### Publishing
- [ ] Run `npm run publish:latest`
- [ ] Verify package appears on npm as latest
- [ ] Test installation: `npm install xml-rule-builder`

### Post-Publishing
- [ ] Create GitHub release
- [ ] Update documentation
- [ ] Announce release
- [ ] Monitor for issues

## Version Management

### Semantic Versioning Rules
- **Major (1.0.0)**: Breaking changes
- **Minor (1.1.0)**: New features, backward compatible
- **Patch (1.0.1)**: Bug fixes, backward compatible

### Pre-release Tags
- **Alpha**: `0.1.0-alpha.1` - Internal testing
- **Beta**: `0.1.0-beta.1` - Limited public testing
- **RC**: `1.0.0-rc.1` - Release candidate

## Commands Reference

```bash
# Version management
npm run version:patch  # 1.0.0 -> 1.0.1
npm run version:minor  # 1.0.0 -> 1.1.0
npm run version:major  # 1.0.0 -> 2.0.0

# Publishing
npm run publish:alpha   # Publish alpha version
npm run publish:beta    # Publish beta version
npm run publish:latest  # Publish production version
npm run publish:dry-run # Test without publishing

# Quality checks
npm run build:clean     # Clean build
npm run lint           # Run linting
npm run test           # Run tests
npm run test:coverage  # Run tests with coverage
```

## Rollback Plan

If issues are found after publishing:

1. **Within 72 hours**: Use `npm unpublish xml-rule-builder@version`
2. **After 72 hours**: Use `npm deprecate xml-rule-builder@version "message"`
3. **Document issues**: Update README with known issues
4. **Plan fix**: Create patch version with fixes

## Notes

- Keep this checklist updated with each release
- Add new items as issues are discovered
- Use this for both manual and automated releases
- Document any deviations from the process 