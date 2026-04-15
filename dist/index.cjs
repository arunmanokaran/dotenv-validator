"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createEnv: () => createEnv
});
module.exports = __toCommonJS(index_exports);

// src/createEnv.ts
var dotenv = __toESM(require("dotenv"), 1);

// src/parseValue.ts
function createError(key, message) {
  throw new Error(`[env-guard] ${key}: ${message}`);
}
function parseNumber(key, value) {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) {
    createError(key, `Invalid number "${value}"`);
  }
  return num;
}
function parseBoolean(key, value) {
  if (typeof value === "boolean") return value;
  const normalized = value.toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;
  createError(key, `Invalid boolean "${value}"`);
}
function parseString(value) {
  return String(value);
}
function parseValue(key, rawValue, field) {
  if (rawValue === void 0 || rawValue === null) {
    createError(key, "Value is undefined or null");
  }
  let parsed;
  switch (field.type) {
    case "number":
      parsed = parseNumber(key, rawValue);
      break;
    case "boolean":
      parsed = parseBoolean(key, rawValue);
      break;
    case "string":
      parsed = parseString(rawValue);
      break;
    default:
      createError(key, `Unsupported type "${field.type}"`);
  }
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

// src/createEnv.ts
dotenv.config({ quiet: true });
function createEnv(schema, options) {
  const result = {};
  if (options && options.strict) {
    const prefix = options.prefix ?? "";
    for (const key in process.env) {
      if (prefix && !key.startsWith(prefix)) continue;
      if (!(key in schema)) {
        throw new Error(`Unknown env variable: ${key}`);
      }
    }
  }
  for (const key in schema) {
    const config2 = schema[key];
    let value = process.env[key];
    if (!config2) continue;
    if (value === void 0 || value === "") {
      if (config2.default !== void 0) {
        value = config2.default;
      } else if (config2.required) {
        throw new Error(`Missing env variable: ${key}`);
      }
    }
    const parsed = parseValue(key, value, config2);
    result[key] = parsed;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createEnv
});
