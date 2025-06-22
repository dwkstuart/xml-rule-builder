# Publishing Guide for XML RuleKit

This guide will help you publish the XML RuleKit package to npm.

## Prerequisites

1. **npm account**: Make sure you have an npm account and are logged in
2. **GitHub account**: For hosting the repository
3. **Node.js and npm**: Latest LTS versions

## Step 1: Create New Repository

1. Create a new repository on GitHub named `xml-rulekit`
2. Clone the new repository locally:
   ```bash
   git clone https://github.com/yourusername/xml-rulekit.git
   cd xml-rulekit
   ```

## Step 2: Copy Your Code

Copy all the files from your current project to the new repository:

```bash
# From your current project directory
cp -r src/ ../xml-rulekit/
cp -r examples/ ../xml-rulekit/
cp -r dist/ ../xml-rulekit/
cp package.json ../xml-rulekit/
cp tsconfig.json ../xml-rulekit/
cp README.md ../xml-rulekit/
cp LICENSE ../xml-rulekit/
cp eslint.config.js ../xml-rulekit/
cp .gitignore ../xml-rulekit/
cp .github/ ../xml-rulekit/
```

## Step 3: Update Configuration

1. **Update package.json repository URLs**:
   ```json
   {
     "repository": {
       "type": "git",
       "url": "https://github.com/yourusername/xml-rulekit.git"
     },
     "bugs": {
       "url": "https://github.com/yourusername/xml-rulekit/issues"
     },
     "homepage": "https://github.com/yourusername/xml-rulekit#readme"
   }
   ```

2. **Update author information**:
   ```json
   {
     "author": "Your Name <your.email@example.com>"
   }
   ```

## Step 4: Prepare for Publishing

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Test the build**:
   ```bash
   npm run lint
   npm test
   ```

4. **Verify the dist folder**:
   ```bash
   ls dist/
   # Should contain: index.js, index.d.ts, types.js, types.d.ts, xmlTypes.js, xmlTypes.d.ts, components/, utils/
   ```

## Step 5: Test Locally (Optional)

Before publishing, you can test the package locally:

1. **Link the package locally**:
   ```bash
   npm link
   ```

2. **In another project, link to your package**:
   ```bash
   npm link xml-rulekit
   ```

3. **Test the imports**:
   ```typescript
   import { XmlRuleBuilder, xmlToRules } from 'xml-rulekit';
   ```

## Step 6: Publish to npm

1. **Login to npm** (if not already logged in):
   ```bash
   npm login
   ```

2. **Check what will be published**:
   ```bash
   npm pack --dry-run
   ```

3. **Publish the package**:
   ```bash
   npm publish
   ```

   Or for the first time with public access:
   ```bash
   npm publish --access public
   ```

## Step 7: Verify Publication

1. **Check on npm**:
   Visit: https://www.npmjs.com/package/xml-rulekit

2. **Test installation**:
   ```bash
   npm install xml-rulekit
   ```

3. **Test in a new project**:
   ```bash
   mkdir test-xml-rulekit
   cd test-xml-rulekit
   npm init -y
   npm install xml-rulekit
   ```

   Create a test file:
   ```typescript
   import { createDefaultGroup, rulesToXml } from 'xml-rulekit';
   
   const rules = createDefaultGroup();
   const xml = rulesToXml(rules);
   console.log(xml);
   ```

## Step 8: Update Documentation

1. **Update README.md** with correct repository links
2. **Add badges** to README.md:
   ```markdown
   ![npm version](https://img.shields.io/npm/v/xml-rulekit)
   ![npm downloads](https://img.shields.io/npm/dm/xml-rulekit)
   ![GitHub stars](https://img.shields.io/github/stars/yourusername/xml-rulekit)
   ![License](https://img.shields.io/npm/l/xml-rulekit)
   ```

3. **Create GitHub releases** for each version

## Step 9: Continuous Publishing

Set up GitHub Actions for automatic publishing:

1. **Add npm token to GitHub secrets**:
   - Go to GitHub repository settings
   - Add secret: `NPM_TOKEN` with your npm access token

2. **Create release workflow** (`.github/workflows/release.yml`):
   ```yaml
   name: Release
   on:
     push:
       tags:
         - 'v*'
   jobs:
     release:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: '20'
             registry-url: 'https://registry.npmjs.org'
         - run: npm ci
         - run: npm run build
         - run: npm run lint
         - run: npm publish
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

## Version Management

For future updates:

1. **Update version**:
   ```bash
   npm version patch  # 0.1.0 -> 0.1.1
   npm version minor  # 0.1.0 -> 0.2.0
   npm version major  # 0.1.0 -> 1.0.0
   ```

2. **Push changes and tags**:
   ```bash
   git push origin main
   git push origin --tags
   ```

## Troubleshooting

### Common Issues

1. **Package name already taken**:
   - Try a different name or add your username as scope: `@yourusername/xml-rulekit`

2. **Build errors**:
   - Check TypeScript configuration
   - Ensure all dependencies are installed
   - Verify import/export statements

3. **Publishing errors**:
   - Check if you're logged in: `npm whoami`
   - Verify package.json is valid: `npm run prepublishOnly`

4. **TypeScript declaration errors**:
   - Ensure `declaration: true` in tsconfig.json
   - Check that all types are properly exported

### Support

If you encounter issues:
1. Check npm documentation: https://docs.npmjs.com/
2. Review TypeScript publishing guide: https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
3. Check GitHub Actions documentation: https://docs.github.com/en/actions

## Next Steps

After successful publication:

1. **Share on social media** and developer communities
2. **Write blog posts** about the library
3. **Create tutorials** and examples
4. **Monitor issues** and provide support
5. **Plan future features** based on user feedback

Good luck with your publication! 🚀 