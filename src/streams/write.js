import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createWriteStream } from "node:fs";
import { stdin } from "node:process";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToWrite.txt";
const ERROR_MESSAGE = "STREAM operation failed";

const write = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const writeStream = createWriteStream(FINAL_FILENAME_PATH);

        stdin.pipe(writeStream);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await write();
