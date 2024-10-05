import { dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { release, version } from "node:os";
import { createServer } from "node:http";

import "./files/c.js";

const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
const ENTRY_DIRNAME_PATH = dirname(ENTRY_FILE_PATH);
const PORT = 3000;
const INCOMING_MESSAGE = "Request accepted";

const random = Math.random();

export const unknownObject =
    random > 0.5
        ? await import("./files/a.json", { with: { type: "json" } })
        : await import("./files/b.json", { with: { type: "json" } });

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);
console.log(`Path to current file is ${ENTRY_FILE_PATH}`);
console.log(`Path to current directory is ${ENTRY_DIRNAME_PATH}`);
console.log(unknownObject);

export const myServer = createServer((_, response) => {
    response.end(INCOMING_MESSAGE);
});

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
});
