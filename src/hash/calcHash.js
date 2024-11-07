import { join } from "node:path";
import { createReadStream } from "node:fs";

import { extractPathInfo } from "../utils/extract-path-info";

const { createHash } = await import("node:crypto");

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToCalculateHashFor.txt";
const ALGORITHM = "sha256";
const ENCODING = "hex";
const ERROR_MESSAGE = "HASH operation failed";

const calculateHash = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const readStream = createReadStream(FINAL_FILENAME_PATH);
        const hash = createHash(ALGORITHM);

        readStream.pipe(hash).on("finish", () => {
            console.log(`SHA256 hash for file: ${hash.digest(ENCODING)}`);
        });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await calculateHash();
