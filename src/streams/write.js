import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createWriteStream } from "node:fs";
import { stdin } from "node:process";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToWrite.txt";
const ERROR_MESSAGE = "STREAM operation failed";

const write = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

        const writeStream = createWriteStream(FINAL_FILENAME_PATH);

        stdin.pipe(writeStream);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await write();
