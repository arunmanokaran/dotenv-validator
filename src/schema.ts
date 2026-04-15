// -----------------------------
// 1. Primitive Types
// -----------------------------
export type EnvPrimitiveType = "string" | "number" | "boolean";


// -----------------------------
// 2. Type Mapping
// -----------------------------
type TypeMap = {
  string: string;
  number: number;
  boolean: boolean;
};


// -----------------------------
// 3. Schema Field Definition
// -----------------------------
export type EnvField<T extends EnvPrimitiveType = EnvPrimitiveType> = {
  // Required type of the variable
  type: T;

  // Whether variable must exist
  required?: boolean;

  // Default value if not provided
  default?: unknown;

  // Allowed values (validated AFTER parsing)
  enum?: readonly (
    T extends "number"
      ? number
      : T extends "boolean"
      ? boolean
      : string
  )[];
};


// -----------------------------
// 4. Full Schema Definition
// -----------------------------
export type EnvSchema = Record<string, EnvField>;


// -----------------------------
// 5. Options
// -----------------------------
export type EnvOptions = {
  strict?: boolean;   // Reject unknown variables
  prefix?: string;    // Optional prefix filtering (e.g. APP_)
};


// -----------------------------
// 6. Type Inference (Output Type)
// -----------------------------
export type InferEnv<T extends EnvSchema> = {
  [K in keyof T]:
    T[K]["type"] extends keyof TypeMap
      ? TypeMap[T[K]["type"]]
      : never;
};