import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, readFile } from "node:fs/promises";

const INIT_DIRNAME = "files";
const READ_FILENAME = "fileToRead.txt";
const ENCODING = "utf-8";
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const READ_FILE_PATH = join(ENTRY_DIRNAME_PATH, READ_FILENAME);

        await access(READ_FILE_PATH, constants.F_OK);

        const content = await readFile(READ_FILE_PATH, ENCODING);

        console.log(content);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await read();
