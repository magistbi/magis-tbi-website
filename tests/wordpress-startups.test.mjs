import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import * as ts from "typescript";

function loadWordPressModule(fetchImpl) {
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
    Array,
    Buffer,
    Date,
    Error,
    Intl,
    JSON,
    Math,
    Number,
    Object,
    Promise,
    RegExp,
    Set,
    String,
    URL,
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
    fetch: fetchImpl,
  };

  vm.runInNewContext(outputText, sandbox, { filename: sourcePath });
  return module.exports;
}

function createResponse(payload, headers = {}) {
  return {
    ok: true,
    json: async () => payload,
    headers: {
      get(name) {
        return headers[name.toLowerCase()] ?? null;
      },
    },
  };
}

process.env.WORDPRESS_API_URL = "https://cms.example.com";
process.env.WORDPRESS_DOMAIN = "https://cms.example.com";

const requests = [];
const fetchImpl = async (url) => {
  const parsed = new URL(String(url));
  requests.push(parsed);

  if (parsed.pathname.endsWith("/media")) {
    const include = parsed.searchParams.get("include");

    if (include === "55") {
      return createResponse([
        {
          id: 55,
          source_url: "https://cms.example.com/wp-content/uploads/2026/01/agritech-logo.png",
          alt_text: "AgriTech Solutions logo",
          caption: { rendered: "<p>AgriTech Solutions logo</p>" },
          title: { rendered: "AgriTech Solutions logo" },
          media_details: {
            width: 512,
            height: 512,
          },
        },
      ]);
    }
  }

  if (parsed.pathname.endsWith("/startups")) {
    const slug = parsed.searchParams.get("slug");
    const page = parsed.searchParams.get("page");

    if (slug === "agritech-solutions") {
      return createResponse([
        {
          id: 21,
          slug: "agritech-solutions",
          date: "2026-01-15T00:00:00",
          modified: "2026-06-01T00:00:00",
          link: "https://cms.example.com/agritech-solutions",
          title: { rendered: "AgriTech Solutions" },
          excerpt: { rendered: "<p>Smart agriculture tools for Bicol farms.</p>" },
          acf: {
            startup_name: "AgriTech Solutions",
            founder_names: "Ana Reyes, Ben Cruz",
            cohort: "2023",
            industry: "Agritech",
            description: "Empowering Bicolano farmers with IoT-driven smart agriculture tools.",
            logo: {
              id: 55,
            },
          },
        },
      ]);
    }

    if (slug === "sparse-startup") {
      return createResponse([
        {
          id: 22,
          slug: "sparse-startup",
          date: "2026-02-01T00:00:00",
          modified: "2026-06-05T00:00:00",
          link: "https://cms.example.com/sparse-startup",
          title: { rendered: "Solar Loop" },
          excerpt: { rendered: "<p>Compact excerpt for the startup profile.</p>" },
          acf: {
            founder_names: "Ivy Salazar",
          },
        },
      ]);
    }

    if (slug === "missing-startup") {
      return createResponse([]);
    }

    if (page === "1") {
      return createResponse([
        {
          slug: "agritech-solutions",
          modified: "2026-06-01T00:00:00",
          date: "2026-01-15T00:00:00",
        },
        {
          slug: "sparse-startup",
          modified: "2026-06-05T00:00:00",
          date: "2026-02-01T00:00:00",
        },
        {
          slug: "",
          modified: "2026-06-05T00:00:00",
        },
      ]);
    }
  }

  return createResponse([]);
};

const {
  getStartupBySlug,
  getStartupSitemapEntries,
} = loadWordPressModule(fetchImpl);

{
  const startup = await getStartupBySlug("agritech-solutions");

  assert.deepEqual(JSON.parse(JSON.stringify(startup)), {
    id: 21,
    slug: "agritech-solutions",
    startupName: "AgriTech Solutions",
    founderNames: ["Ana Reyes", "Ben Cruz"],
    cohort: "2023",
    industry: "Agritech",
    description: "Empowering Bicolano farmers with IoT-driven smart agriculture tools.",
    logo: {
      id: 55,
      url: "https://cms.example.com/wp-content/uploads/2026/01/agritech-logo.png",
      alt: "AgriTech Solutions logo",
      caption: "AgriTech Solutions logo",
      width: 512,
      height: 512,
    },
  });
}

{
  const startup = await getStartupBySlug("sparse-startup");

  assert.deepEqual(JSON.parse(JSON.stringify(startup)), {
    id: 22,
    slug: "sparse-startup",
    startupName: "Solar Loop",
    founderNames: ["Ivy Salazar"],
    cohort: null,
    industry: null,
    description: "Compact excerpt for the startup profile.",
    logo: null,
  });
}

{
  const startup = await getStartupBySlug("missing-startup");

  assert.equal(startup, null, "missing startup should resolve to null");
}

{
  const entries = await getStartupSitemapEntries();

  assert.deepEqual(JSON.parse(JSON.stringify(entries)), [
    {
      slug: "agritech-solutions",
      modified: "2026-06-01T00:00:00",
    },
    {
      slug: "sparse-startup",
      modified: "2026-06-05T00:00:00",
    },
  ]);
}

assert.ok(
  requests.some((request) => request.pathname.endsWith("/startups")),
  "startup fetches should hit the WordPress startups collection",
);

console.log("wordpress startup helper tests passed");
