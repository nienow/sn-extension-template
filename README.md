# Standard Notes Editor Extension Template

This is a template repo for building a Standard Notes Editor Extension.

For a companion guide, see the [Guide to creating Standard Notes Extensions](https://randombits.dev/standard-notes/creating-extensions)

## Getting Started

Click on the `Use this template` button to create a new repo based on this template.

Then clone your new repo, install dependencies, and start the dev server:

```
# Install dependencies
pnpm install

# Start Dev Server
pnpm run start
```

The demo page should be launched automatically.

## Demo Page

The template includes a separate demo page that allows you to develop and test your extension without it running inside standard notes. It works by wrapping your editor with a **mock standard notes**, which sends and receives the same events that the real application would.

The demo page and related scripts is built as a separate entry, and therefore is not included in your actual editor build. It is only included in the demo.html page.

The demo page can also be used to demonstrate your extension on your personal website or blog.

Demo Example: https://nienow.github.io/sn-extension-template/demo.html

## Extension JSON

When users install your extension, they will be using the ext.json file, which contains information about your extension. You will want to edit this file at public/ext.json, changing the urls, identifier, name, and description:

```json
{
  "identifier": "dev.randombits.template",
  "name": "Extension Template",
  "content_type": "SN|Component",
  "area": "editor-editor",
  "version": "$VERSION$",
  "description": "A custom editor",
  "url": "https://nienow.github.io/sn-extension-template/",
  "download_url": "https://nienow.github.io/sn-extension-template/latest.zip",
  "latest_url": "https://nienow.github.io/sn-extension-template/ext.json"
}
```

The version variable (`$VERSION$`) is written during build, and is copied from the version in your `package.json` file.

The build automatically creates a `latest.zip` distribution that is used by the desktop application.

The `public/local.json` file can be used if you want to install your editor into standard notes while it is running on localhost. Sometimes it is necessary to do this to debug issues. It has a separate name and identifier so that you can install both the production version and dev version in standard notes at the same time.

## Preact Framework

This template uses **Preact** instead of **React**. But because we are also pulling in the `@preact/compat` package, it is compatible with the React API and can take advantage of the full react ecosystem.

If you don’t know about Preact, it is smaller and faster than React, and contains basically all the React functionality, so there is no reason not to use it.

## Github Workflow

There is a github workflow setup in `.github/workflows/node.js.yml`, which will automatically build and deploy your extension to github pages.

If you use this workflow, make sure you have your Workflow Permissions set to “Read and write permissions” (under Settings -> Actions -> General).

## Resources

[Guide to creating Standard Notes Extensions](https://randombits.dev/standard-notes/creating-extensions)

[Guide to installing Standard Notes Extensions](https://randombits.dev/standard-notes/installing-extensions)
