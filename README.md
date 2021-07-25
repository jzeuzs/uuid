<div align="center">

# @tomiocodes/uuid

**A simple utility to generate Universally Unique Identifiers.**

[![GitHub](https://img.shields.io/github/license/1chiSensei/uuid)](https://github.com/1chiSensei/uuid/blob/main/LICENSE.md)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@tomiocodes/uuid?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@tomiocodes/uuid)
[![npm](https://img.shields.io/npm/v/@tomiocodes/uuid?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@tomiocodes/uuid)

</div>

**Table of Contents**

-   [@tomiocodes/uuid](#tomiocodesprompt)
    -   [Description](#description)
    -   [Features](#features)
    -   [Installation](#installation)
    -   [Usage](#usage)
        -   [Basic Usage](#basic-usage)
        -   [CLI Usage](#cli-usage)
            -   [CLI Auto-completion](#cli-auto-completion)
    -   [API Documentation](#api-documentation)

## Description

A simple library to generate UUIDs.

## Features

-   Written in TypeScript
-   Offers CommonJS, ESM bundles
-   Fully tested
-   Powered by Rust
-   Faster than [uuid](https://npmjs.com/uuid)

## Installation

```sh
yarn add @tomiocodes/uuid
# npm install @tomiocodes/uuid
# pnpm add @tomiocodes/uuid

# Or if you want a CLI Installation
npm i -g @tomiocodes/uuid
```

## Usage

**Note:** While this section uses `require`, the imports match 1:1 with ESM imports. For example `const { v4 } = require('@tomiocodes/uuid')` equals `import { v4 } from '@tomiocodes/uuid'`.

### Basic Usage

```js
const { v4 } = require('@tomiocodes/uuid');

console.log(v4());
```

### CLI Usage

```sh
   @tomiocodes/uuid 1.1.1

   USAGE

     uuid-cli <command> [options]

   COMMANDS

     v1                         Generates a timestamp UUID.
     v3 <namespace> <name>      Generates a MD5 UUID.
     v4                         Generates a random UUID.
     v5 <namespace> <name>      Generates a SHA-1 UUID.
     validate <uuid>            Validates a UUID.
     parse <uuid>               Provides information about a UUID.
     blob <uuid>                Converts a UUID to a 22 character URL-friendly blob.
     help <command>             Display help for a specific command

   GLOBAL OPTIONS

     -h, --help         Display help
     -V, --version      Display version
     --no-color         Disable colors
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages
```

#### CLI Auto-completion

> Bash

```sh
echo "source <(uuid-cli completion bash)" >> ~/.bashrc && source ~/.bashrc
```

> Zsh

```sh
echo "source <(uuid-cli completion zsh)" >> ~/.zshrc && source ~/.zshrc
```

> Fish

```sh
echo "source <(uuid-cli completion fish)" >> ~/.config/fish/config.fish && source ~/.config/fish/config.fish
```

---

## API Documentation

For the full API documentation please refer to the TypeDoc generated [documentation](https://uuid-ivory.vercel.app/).
