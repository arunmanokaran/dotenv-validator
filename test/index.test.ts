import { createEnv } from "../src/createEnv.js";
import { parseValue } from "../src/parseValue.js";

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("createEnv", () => {
  test("parses configured environment variables", () => {
    process.env.PORT = "3000";
    process.env.DEBUG = "false";
    process.env.NODE_ENVIRONMENT = "production";

    const env = createEnv(
      {
        PORT: { type: "number", required: true },
        DEBUG: { type: "boolean" },
        NODE_ENVIRONMENT: {
          type: "string",
          enum: ["production", "development"],
        },
      },
      {
        strict: false,
      },
    );

    expect(env.PORT).toBe(3000);
    expect(env.DEBUG).toBe(false);
    expect(env.NODE_ENVIRONMENT).toBe("production");
  });

  test("parses values without options", () => {
    process.env.NAME = "env-guard";

    const env = createEnv({
      NAME: { type: "string" },
    });

    expect(env.NAME).toBe("env-guard");
  });

  test("uses defaults for missing values", () => {
    process.env = {};

    const env = createEnv({
      PORT: { type: "number", default: 3000 },
    });

    expect(env.PORT).toBe(3000);
  });

  test("throws when a required value is missing", () => {
    process.env = {};

    expect(() =>
      createEnv({
        PORT: { type: "number", required: true },
      }),
    ).toThrow("Missing env variable: PORT");
  });

  test("throws when an optional value has no default", () => {
    process.env = {};

    expect(() =>
      createEnv({
        OPTIONAL: { type: "string" },
      }),
    ).toThrow("[env-guard] OPTIONAL: Value is undefined or null");
  });

  test("throws for unknown variables in strict mode", () => {
    process.env = { PORT: "3000", EXTRA: "value" };

    expect(() =>
      createEnv(
        {
          PORT: { type: "number" },
        },
        { strict: true },
      ),
    ).toThrow("Unknown env variable: EXTRA");
  });

  test("strict mode ignores variables outside the prefix", () => {
    process.env = {
      APP_PORT: "3000",
      OTHER_PORT: "4000",
    };

    const env = createEnv(
      {
        APP_PORT: { type: "number" },
      },
      { strict: true, prefix: "APP_" },
    );

    expect(env.APP_PORT).toBe(3000);
  });

  test("skips undefined schema entries", () => {
    process.env.NAME = "env-guard";

    const env = createEnv({
      MISSING: undefined,
      NAME: { type: "string" },
    } as any);

    expect(env.NAME).toBe("env-guard");
    expect("MISSING" in env).toBe(false);
  });
});

describe("parseValue", () => {
  test("parses number and boolean raw values", () => {
    expect(parseValue("PORT", 3000, { type: "number" })).toBe(3000);
    expect(parseValue("DEBUG", true, { type: "boolean" })).toBe(true);
    expect(parseValue("ENABLED", "yes", { type: "boolean" })).toBe(true);
    expect(parseValue("DISABLED", "no", { type: "boolean" })).toBe(false);
  });

  test("throws for invalid number values", () => {
    expect(() => parseValue("PORT", "abc", { type: "number" })).toThrow(
      '[env-guard] PORT: Invalid number "abc"',
    );
  });

  test("throws for invalid boolean values", () => {
    expect(() => parseValue("DEBUG", "maybe", { type: "boolean" })).toThrow(
      '[env-guard] DEBUG: Invalid boolean "maybe"',
    );
  });

  test("throws for nullish values", () => {
    expect(() => parseValue("PORT", undefined, { type: "number" })).toThrow(
      "[env-guard] PORT: Value is undefined or null",
    );
  });

  test("throws for unsupported types", () => {
    expect(() =>
      parseValue("STARTED_AT", "today", { type: "date" as any }),
    ).toThrow('[env-guard] STARTED_AT: Unsupported type "date"');
  });

  test("throws for enum mismatches", () => {
    expect(() =>
      parseValue("NODE_ENVIRONMENT", "test", {
        type: "string",
        enum: ["production", "development"],
      }),
    ).toThrow(
      '[env-guard] NODE_ENVIRONMENT: Invalid value "test". Expected one of: production, development',
    );
  });
});
