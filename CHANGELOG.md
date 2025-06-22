# Changelog
# 0.1.0 (2025-06-22)

* refactor: enhance custom types configuration and update demo

- Added new custom types: Email, Postcode, Zipcode, Gender, Relationship Status, Nationality, and Disabilities with corresponding comparators.
- Updated demo page to reflect the new custom types in the XML Rules Builder.
- Improved input validation for Email, Postcode, and Zipcode fields in the custom types handling.

* feat: add XML import functionality to demo page

- Introduced a new tab for XML Import in the demo page.
- Implemented functionality to load sample and custom XML, parsing it into rule blocks.
- Added error handling for invalid XML formats and validation feedback for imported rules.
- Enhanced the demo experience by allowing users to clear imports and view the loaded XML.

* chore: update changelog workflow to ensure file creation and install dependencies

- Added step to install changelog dependencies for generating changelogs.
- Modified changelog generation step to create CHANGELOG.md if it does not exist before appending changes.

* chore: update package.json dependencies and modify lint workflow

- Added eslint-plugin-react to devDependencies for improved linting support.
- Updated npm install command in the GitHub Actions workflow to use --legacy-peer-deps for better compatibility with peer dependencies.



## 0.1.0 (2025-06-22)

* chore: update changelog and package dependencies (#8) ([94a0658](https://github.com/dwkstuart/xml-rule-builder/commit/94a0658)), closes [#8](https://github.com/dwkstuart/xml-rule-builder/issues/8)



