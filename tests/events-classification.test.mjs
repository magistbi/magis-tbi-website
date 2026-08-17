import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import * as ts from "typescript";

function loadEventsModule() {
  const sourcePath = path.resolve(process.cwd(), "lib/events.ts");
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
    require: () => {
      throw new Error("Unexpected runtime import while loading lib/events.ts");
    },
    console,
    process,
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });
  return module.exports;
}

const {
  formatEventDateTimeAttribute,
  isPastEvent,
  isUpcomingEvent,
  parseEventDateValue,
} = loadEventsModule();

function buildEvent(overrides = {}) {
  return {
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: "publish",
    ...overrides,
  };
}

{
  const futureEvent = buildEvent();

  assert.equal(isUpcomingEvent(futureEvent), true, "future published event should be upcoming");
  assert.equal(isPastEvent(futureEvent), false, "future published event should not be archived");
}

{
  const pastEvent = buildEvent({
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  });

  assert.equal(isUpcomingEvent(pastEvent), false, "past published event should not be upcoming");
  assert.equal(isPastEvent(pastEvent), true, "past published event should be archived");
}

{
  const closedEvent = buildEvent({
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "closed",
  });

  assert.equal(isPastEvent(closedEvent), true, "closed event should stay in the archive");
}

{
  const malformedEvent = buildEvent({
    startDate: "",
  });
  const missingDateEvent = {
    status: "publish",
  };

  assert.equal(isUpcomingEvent(malformedEvent), false, "malformed event should not be upcoming");
  assert.equal(isPastEvent(malformedEvent), false, "malformed event should not be archived");
  assert.equal(isUpcomingEvent(missingDateEvent), false, "missing date should not be upcoming");
  assert.equal(isPastEvent(missingDateEvent), false, "missing date should not be archived");
  assert.equal(parseEventDateValue("not-a-date"), 0, "invalid dates should normalize to zero");
  assert.equal(formatEventDateTimeAttribute("not-a-date"), null, "invalid dates should not format");
}

console.log("events classification tests passed");
