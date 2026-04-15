// -----------------------------
// 1. Types (minimal, reusable)
// -----------------------------
export type EnvPrimitiveType = "string" | "number" | "boolean";

export type EnvField = {
  type: EnvPrimitiveType;
  enum?: readonly any[];
};


// -----------------------------
// 2. Error Helper
// -----------------------------
function createError(key: string, message: string): never {
  throw new Error(`[env-guard] ${key}: ${message}`);
}


// -----------------------------
// 3. Parsers
// -----------------------------
function parseNumber(key: string, value: string | number): number {
  const num = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(num)) {
    createError(key, `Invalid number "${value}"`);
  }

  return num;
}


function parseBoolean(key: string, value: string | boolean): boolean {
  if (typeof value === "boolean") return value;

  const normalized = value.toLowerCase();

  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;

  createError(key, `Invalid boolean "${value}"`);
}


function parseString(value: unknown): string {
  return String(value);
}


// -----------------------------
// 4. Main parseValue function
// -----------------------------
export function parseValue(
  key: string,
  rawValue: unknown,
  field: EnvField
): string | number | boolean {

  if (rawValue === undefined || rawValue === null) {
    createError(key, "Value is undefined or null");
  }

  let parsed: string | number | boolean;

  switch (field.type) {
    case "number":
      parsed = parseNumber(key, rawValue as any);
      break;

    case "boolean":
      parsed = parseBoolean(key, rawValue as any);
      break;

    case "string":
      parsed = parseString(rawValue);
      break;

    default:
      createError(key, `Unsupported type "${field.type}"`);
  }

  // -----------------------------
  // 5. Enum Validation (AFTER parsing)
  // -----------------------------
  if (field.enum) {
    const isValid = field.enum.includes(parsed);

    if (!isValid) {
      createError(
        key,
        `Invalid value "${parsed}". Expected one of: ${field.enum.join(", ")}`
      );
    }
  }

  return parsed;
}
