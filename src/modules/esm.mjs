import { dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";

import "./files/c.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);
console.log(unknownObject);

export const myServer = createServerHttp((_, response) => {
    response.end(INCOMING_MESSAGE);
});

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
});
