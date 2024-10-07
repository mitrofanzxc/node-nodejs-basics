import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fresh.txt";
const DATA = "I am fresh and young";
const FLAG_WRITE_FILE = "wx";
const ERROR_MESSAGE = "FS operation failed";

const create = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const data = new Uint8Array(Buffer.from(DATA));

        await writeFile(FINAL_FILENAME_PATH, data, { flag: FLAG_WRITE_FILE });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();
