# Email HTML Generator

Powered by [Astro](https://astro.build/)

## How to use

Install the dependencies.

```bash
pnpm install
```

Following the [Create your email](#create-your-email) section to define templates and documents.

Use your package manager to build the project.

```bash
pnpm build
```

Preview the built website.

```bash
pnpm preview
```

At the index page of the website, you can copy the title, HTML code. You can also preview what your email looks like in the browser.

For development, run the following command.

```bash
pnpm dev
```

## Create your email

Define your email **templates** (AKA **layouts**) in [src/templates/](src/templates/).

Then define your email documents using the templates in [docs/](docs/). You didn't need to pass the props by `<Template someProp={someValue}>...</Template>`. Use `defineProps` instead.

```jsx
---
// docs/reset-password.astro
import Template, { type CommonConfig } from '@/templates/Template.astro'
import defauntConfig from './_config/common.mjs'

export function defineProps(): CommonConfig = {
  return Object.assign({}, defaultConfig, {
    title: 'Reset your password'
  })
}
---

<Template {...Astro.props}>
  We received a request to reset your password. Click the link below to reset it.
</Template>
```

The returned value from `defineProps` will be passed to `Astro.props` in the document.

By passing `Astro.props` to the template, you can access the props in the template.

```jsx
---
// src/templates/Template.astro

export interface CommonConfig {
  title: string
}

const config = Astro.props
---

<div>
  <h1>{config.title}</h1>
  <p><slot /></p>
</div>
```

This is to clarify the props and configuration. If you want to parse some props to configure the DOM item, you can split them.

```jsx
---
// src/templates/Template.astro

const { target, ...config } = Astro.props
---

<body>
  <h1>{config.title}</h1>
  <div>
    <p><slot /></p>
  </div>
  <div>
    <a href="https://github.com" target={target || '_blank'}>Go to GitHub</a>
  </div>
</body>
```

and in `docs/reset-password.astro`

```jsx
---
// docs/reset-password.astro
export function defineProps(): CommonConfig = {
  return Object.assign({}, defaultConfig, {
    title: 'Reset your password'
  })
}
---

<Template target="_self" {...Astro.props}>
  We received a request to reset your password. Click the link below to reset it.
</Template>
```

## License

Copyright (c) 2025. All rights reserved.

Licensed under the [MIT](LICENSE) license.
