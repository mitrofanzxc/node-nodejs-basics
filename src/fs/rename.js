import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, rename as promiseRename } from "node:fs/promises";

const INIT_DIRNAME = "files";
const WRONG_FILENAME = "wrongFilename.txt";
const PROPER_FILENAME = "properFilename.md";
const ERROR_MESSAGE = "FS operation failed";
const ERROR_ENOENT = "ENOENT";

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);
    const WRONG_FILE_PATH = join(ENTRY_DIRNAME_PATH, WRONG_FILENAME);
    const PROPER_FILE_PATH = join(ENTRY_DIRNAME_PATH, PROPER_FILENAME);

    try {
        await access(WRONG_FILE_PATH, constants.F_OK);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }

    try {
        await access(PROPER_FILE_PATH, constants.F_OK);

        throw new Error(ERROR_MESSAGE);
    } catch (error) {
        if (error.code !== ERROR_ENOENT) {
            throw new Error(ERROR_MESSAGE);
        }
    }

    try {
        await promiseRename(WRONG_FILE_PATH, PROPER_FILE_PATH);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await rename();
