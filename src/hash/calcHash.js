import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
const { createHash } = await import("node:crypto");

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToCalculateHashFor.txt";
const ALGORITHM = "sha256";
const ENCODING = "hex";
const ERROR_MESSAGE = "HASH operation failed";

const calculateHash = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
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
