[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="top"></a>

# FileSearchApp

<a name="description"></a>

# Description

Recently, I published **[FileSearchStore-extension](https://github.com/tanaikech/FileSearchStore-extension)**, a Gemini CLI extension designed to integrate and manage the **File Search** feature's stores.

Uploading files from your local machine to a file search store is straightforward. However, if the files are located on **Google Drive**, the current setup requires you to first **download** them and then **upload** them to the file search store, as the management script is run locally. This multi-step process results in a high overhead or **"process cost."**

To eliminate this inefficiency when using files from Google Drive, I created a new library. If the management script is written in **Google Apps Script**, the files can be **seamlessly uploaded** to the file search store without the need for an intermediate download step. This Google Apps Script library, FileSearchApp, helps us manage the file search stores directly using Google Apps Script.

## References

- [https://ai.google.dev/gemini-api/docs/file-search](https://ai.google.dev/gemini-api/docs/file-search)
- [https://ai.google.dev/api/file-search/file-search-stores](https://ai.google.dev/api/file-search/file-search-stores)

# Usage

## 1. Create a Google Apps Script Project

First, create a new standalone Google Apps Script project. A standalone project is not bound to a specific Google Sheet, Doc, or Form, making it ideal for creating a general-purpose web service. You can create one by visiting [script.google.com](https://script.google.com/home/projects/create). [Ref](https://developers.google.com/apps-script/guides/projects#create-standalone)

## 2. Get API key

Please get your API key for using Gemini API. [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

## 3. Install Libraries

### Library Project Key

```text
1jw-dmGrSOtSi1ksUfTAKHOtjzEesQntyA4pfVI9YvwLBBlbFqpX-4C7i
```

### Installation Guide of library

[https://developers.google.com/apps-script/guides/libraries](https://developers.google.com/apps-script/guides/libraries)

# Testing

The sample scripts for testing FileSearchApp are as follows.

```javascript
/**
 * These samples are for testing FileSearchApp as a Google Apps Script library.
 * Please set your API key for using Gemini API.
 *
 */

const apiKey = "###your API key###";

function create() {
  const options = {
    method: "create",
    apiKey,
    config: { displayName: "sample" },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function list() {
  const options = { method: "list", apiKey };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function get() {
  const options = {
    method: "get",
    apiKey,
    config: { fileSearchStoreName: "fileSearchStores/###" },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function remove() {
  const options = {
    method: "remove",
    apiKey,
    config: { fileSearchStoreName: "fileSearchStores/###" },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function media_upload() {
  const options = {
    method: "media_upload",
    apiKey,
    config: {
      fileSearchStoreName: "fileSearchStores/###",
      fileIds: ["{fileId}"],
      // urls: ["https://tanaikech.github.io/about/"],
      // text: "sample text",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function import_file() {
  const options = {
    method: "import_file",
    apiKey,
    config: {
      fileSearchStoreName: "fileSearchStores/###",
      fileName: "files/###",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function documents_list() {
  const options = {
    method: "documents_list",
    apiKey,
    config: {
      fileSearchStoreName: "fileSearchStores/###",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function documents_remove() {
  const options = {
    method: "documents_remove",
    apiKey,
    config: {
      documentName: "fileSearchStores/###/documents/###",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function documents_get() {
  const options = {
    method: "documents_get",
    apiKey,
    config: {
      documentName: "fileSearchStores/###/documents/###",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function documents_query() {
  const options = {
    method: "documents_query",
    apiKey,
    config: {
      name: "fileSearchStores/###/documents/###",
      query: "tanaike",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}

function generate_content() {
  const options = {
    method: "generate_content",
    apiKey,
    // model: 'models/gemini-2.5-pro', // optional, defaults to flash
    config: {
      fileSearchStoreNames: ["fileSearchStores/###"],
      prompt: "{your prompt}",
    },
  };
  const result = FileSearchApp.fileSearchEntryPoint(options);
  console.log(result);
}
```

---

## Dynamic Model & Thinking Routing (Gemini Decisions API)

`FileSearchApp` supports automatic model and `thinkingLevel` selection powered by the **Gemini Decisions API (`gemini-decision-1`, 0 output tokens)** across the 6-model pool (`gemini-3.5-flash-lite`, `gemini-3.8-flash`, `gemini-4-hydrogen`, `gemini-4-neon`, `gemini-4-argon`, `gemini-4-carbon`).

- **`modelRouting: "efficient"` (Default)**: Routes simple/standard tasks to low-cost fast models (`gemini-3.5-flash-lite` / `gemini-3.8-flash` / `gemini-4-hydrogen`) and automatically escalates to frontier models (`gemini-4-argon` / `gemini-4-carbon`) when complex reasoning or explicit maximum-capability directives are detected in the prompt.
- **`modelRouting: "quality"`**: Prioritizes maximum accuracy and deeper thinking over cost, with GAS 6-minute execution timeout guardrails.
- **`modelRouting: "fixed"`**: Bypasses the Decisions API completely and uses only the configured `model` and `generationConfig`.
- **Automatic Free-Tier Fallback (`billingTier: "auto"`)**: If a Paid-only model (`neon`/`argon`/`carbon`) returns HTTP 403/429, automatically falls back to `models/gemini-4-hydrogen`.
- **Per-Generation Logging & JSON Comparison**: Logs `[ModelRouting] role=... | mode=... | model=... | thinking=... | reason=...` on every generation call. Use `getModelRoutingConfig()` / `previewModelRouting(prompt)` to inspect/compare modes as JSON, and `GeminiDecisionsRouter.configureDefaults(...)` / `registerModels(...)` to customize for future Gemini models.

```javascript
const fsApp = new FileSearch({
  apiKey: "YOUR_GEMINI_API_KEY",
  modelRouting: "efficient", // "efficient" (default) | "quality" | "fixed"
});
```

---
<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

[Donate](https://tanaikech.github.io/donate/)

<a name="updatehistory"></a>

# Update History

- v1.0.0 (November 14, 2025)

  1. Initial release.

- v1.0.1 (June 24, 2026)

  1. Upgraded default model to `models/gemini-3.1-flash-lite`.
  2. Wrapped `FileSearch` into a standard modern export syntax.

- v1.1.0 (November 27, 2026)
  1. Upgraded default model to `models/gemini-4-hydrogen`, fixed `convMimeType_`, filtered thought parts, and added `_pollOperation` max-attempts guard.
  2. Integrated optional fail-open `GeminiDecisionsRouter` support (`modelRouting: "efficient" | "quality" | "fixed"`) and `generationConfig` forwarding in `generate_content()`.

[TOP](#top)
