import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import * as ts from "typescript";

function loadWordPressModule() {
  const sourcePath = path.resolve(process.cwd(), "lib/wordpress.ts");
  const source = fs.readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: sourcePath,
  });

  const module = { exports: {} };
  const sandbox = {
    Buffer,
    Date,
    Intl,
    Math,
    Number,
    Object,
    String,
    JSON,
    RegExp,
    Set,
    module,
    exports: module.exports,
    require: (specifier) => {
      if (specifier === "@/lib/events") {
        return {};
      }

      throw new Error(`Unexpected runtime import while loading ${specifier}`);
    },
    console,
    process,
    fetch: async () => {
      throw new Error("Unexpected fetch while loading lib/wordpress.ts");
    },
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });
  return module.exports;
}

const { readWordPressMediaReference } = loadWordPressModule();

const toPlainObject = (value) => JSON.parse(JSON.stringify(value));

assert.deepEqual(toPlainObject(readWordPressMediaReference(17)), { id: 17, url: null });
assert.deepEqual(toPlainObject(readWordPressMediaReference(" 24 ")), { id: 24, url: null });
assert.deepEqual(toPlainObject(readWordPressMediaReference("https://example.com/poster.jpg")), {
  id: null,
  url: "https://example.com/poster.jpg",
});
assert.deepEqual(
  toPlainObject(
    readWordPressMediaReference({
      id: "31",
      source_url: "https://example.com/poster-31.jpg",
    }),
  ),
  {
    id: 31,
    url: "https://example.com/poster-31.jpg",
  },
);
assert.deepEqual(
  toPlainObject(
    readWordPressMediaReference({
      ID: 42,
      url: "https://example.com/poster-42.jpg",
    }),
  ),
  {
    id: 42,
    url: "https://example.com/poster-42.jpg",
  },
);
assert.deepEqual(toPlainObject(readWordPressMediaReference(null)), { id: null, url: null });

console.log("wordpress media reference tests passed");
