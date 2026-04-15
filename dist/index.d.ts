type EnvPrimitiveType = "string" | "number" | "boolean";
type TypeMap = {
    string: string;
    number: number;
    boolean: boolean;
};
type EnvField<T extends EnvPrimitiveType = EnvPrimitiveType> = {
    type: T;
    required?: boolean;
    default?: unknown;
    enum?: readonly (T extends "number" ? number : T extends "boolean" ? boolean : string)[];
};
type EnvSchema = Record<string, EnvField>;
type EnvOptions = {
    strict?: boolean;
    prefix?: string;
};
type InferEnv<T extends EnvSchema> = {
    [K in keyof T]: T[K]["type"] extends keyof TypeMap ? TypeMap[T[K]["type"]] : never;
};

declare function createEnv<T extends EnvSchema>(schema: T, options?: EnvOptions): InferEnv<T>;

export { type EnvOptions, type EnvSchema, type InferEnv, createEnv };
