# DEV README

## Local development

- Install the dependencies

```
npm ci
```

- Just hit `F5` or start a debugging session, it should open a new VSCode instance with a local version of the extension installed

## Versioning and publishing

### Changes
- Follow the `conventional commits` specification. A husky pre-commit hook will check the commit message using `commitlint`

### Version bump
To bump the version, run
```
npm run release
```
This will:
- Bump the version in `package.json` following SemVer, based on the commits since last version (e.g. a `fix` commit should bump the patch version, `feat` commit should bump the minor and any `!Breaking change` commits should bump _major_)
- Update the changelog
- Make a `chore(release)` and a new tag for the new version

### Publish

> **⚠️ Pre-requisites**
> 
> You'll need an [Azure DevOps PAT](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) and export it as `AZURE_DEVOPS_PAT` before running the following command

To **release** a new version of the extension to the VSCode marketplace, run
```
npm run publish
```

This will use `vsce` to upload the new version to the marketplace.