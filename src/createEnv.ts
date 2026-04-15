import * as dotenv from "dotenv";
import type { EnvSchema, InferEnv, EnvOptions } from "./schema.js";
import { parseValue } from "./parseValue.js";

dotenv.config({ quiet: true });

export function createEnv<T extends EnvSchema>(
  schema: T,
  options?: EnvOptions,
): InferEnv<T> {
  const result: Partial<InferEnv<T>> = {};

  // Strict mode check
  if (options && options.strict) {
    const prefix = options.prefix ?? "";

    for (const key in process.env) {
      if (prefix && !key.startsWith(prefix)) continue;

      if (!(key in schema)) {
        throw new Error(`Unknown env variable: ${key}`);
      }
    }
  }

  // Normal validation
  for (const key in schema) {
    const config = schema[key];
    let value: unknown = process.env[key];

    if (!config) continue;

    if (value === undefined || value === "") {
      if (config.default !== undefined) {
        value = config.default;
      } else if (config.required) {
        throw new Error(`Missing env variable: ${key}`);
      }
    }

    const parsed = parseValue(key, value, config);

    (result as any)[key] = parsed;
  }

  return result as InferEnv<T>;
}
