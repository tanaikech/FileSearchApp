/**
 * These samples are for testing FileSearchApp as a Google Apps Script library.
 * Please set your API key for using Gemini API.
 *
 */

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
