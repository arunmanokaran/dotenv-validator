# dotenv-guard-ts

A lightweight, type-safe environment variable validator for Node.js.

## Why this exists

Working with environment variables in Node.js is surprisingly error-prone:

- Everything is a string (even numbers and booleans)
- Missing variables cause runtime crashes
- Invalid values silently break logic
- Validation logic gets duplicated across files

`dotenv-guard-ts` solves this by giving you a **single, reliable, type-safe configuration layer**.

---

## Features

- Type-safe environment variables
- Runtime validation (fail fast on startup)
- Support for `string`, `number`, `boolean`
- Default values
- Enum validation
- Strict mode (detect unknown variables)
- 100% test coverage
- Works with TypeScript out of the box

---

## Installation

```bash
npm install dotenv-guard-ts

```

---

## Quick start

```bash
import "dotenv/config";
import { createEnv } from "dotenv-guard-ts";

const env = createEnv(\{
  PORT: { type: "number", required: true },
  DEBUG: { type: "boolean", default: false },
  NODE_ENV: {
    type: "string",
    enum: ["development", "production"]
  }
});

console.log(env.PORT); // number
console.log(env.DEBUG); // boolean

```

---

## How it works

```bash
process.env → validation → safe config object
```

---

## Schema Options

```bash
{
  type: "string" | "number" | "boolean",
  required?: boolean,
  default?: unknown,
  enum?: readonly any[]
}
```

---

## Examples

1. Required variable
   PORT: { type: "number", required: true }

Throws an error if missing.

2. Default value
   DEBUG: { type: "boolean", default: false }

Used when variable is not provided.

3. Enum validation
   NODE_ENV: {
   type: "string",
   enum: ["development", "production"]
   }

Rejects invalid values.

---

## Strict Mode

Enable strict mode to catch unknown variables:

createEnv(schema, { strict: true });
Example
EXTRA_VAR=hello
createEnv(schema, { strict: true });

---

## Throws

Unknown env variable: EXTRA_VAR

---

## Error Handling

Errors are thrown during startup (fail-fast approach):

---

## Missing required

[dotenv-guard-ts] PORT: Missing required environment variable

---

## Invalid number

[dotenv-guard-ts] PORT: Invalid number "abc"

---

## Invalid boolean

[dotenv-guard-ts] DEBUG: Invalid boolean "maybe"

---

## Enum violation

Invalid value "prod". Expected one of: development, production

## Requirements

If using .env files locally, install:

```bash
npm install dotenv
```

And load it:

```bash
import "dotenv/config";
```

---

## Future Improvements

- Typed enum inference ("dev" | "prod")
- Custom validators
- Async validation support
- Built-in .env loader

---

## Contributing

Contributions are welcome. Feel free to open issues or PRs.

---

## License

MIT
