# Development

Minimal guide for building and working on MachStyle locally.

## Prerequisites

- WordPress local environment (plugin mounted at `wp-content/plugins/mach-style`).
- PHP 8.1+ with Composer.
- Node.js with pnpm.

## Install dependencies

```bash
pnpm install
composer install
```

## Build assets

```bash
pnpm run build
```

## Development watch mode

```bash
pnpm run start
```

Optional hot reload mode:

```bash
pnpm run start:hot
```

## Lint

Run all JS/style lint tasks:

```bash
pnpm run lint
```

Run tasks individually:

```bash
pnpm run lint:js
pnpm run lint:style
composer run lint:php
```

Optional PHP auto-fix:

```bash
composer run lint:php:fix
```

## Package and release

Build a plugin zip:

```bash
pnpm run plugin-zip
```

Prepare a release-ready plugin zip with production dependencies:

```bash
pnpm run release
```
