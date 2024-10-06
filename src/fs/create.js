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
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

        const data = new Uint8Array(Buffer.from(DATA));

        await writeFile(FINAL_FILENAME_PATH, data, { flag: FLAG_WRITE_FILE });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();
