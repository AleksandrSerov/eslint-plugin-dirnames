`@sserov/eslint-plugin-dirnames`
===================

Eslint plugin for consistent directory naming
(original repository was suspended - https://github.com/alfa-laboratory/eslint-plugin-dirnames)

# Installation

```sh
$ npm install eslint @sserov/eslint-plugin-dirnames --save-dev
```

or

```sh
$ yarn add eslint @sserov/eslint-plugin-dirnames --dev
```

It is also possible to install ESLint globally rather than locally (using npm install eslint --global). However, this is not recommended, and any plugins or shareable configs that you use must be installed locally in either case.

# Configuration

You need to specify individual rules and add extra configuration.

Add "@sserov/dirnames" to the plugins section.

```json
{
  "plugins": [
    "@sserov/dirnames"
  ]
}
```

Enable the rule

```json
  "rules": {
    "@sserov/dirnames/match-kebab-case": "error",
  }
```

# List of supported rules


| Rule | Description |
| :--- | :--- |
| [@sserov/dirnames/match-kebab-case](./docs/rules/match-kebab-case.md) | Enforce a case style for dirnames |
