import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, unlink } from "node:fs/promises";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToRemove.txt";
const ERROR_MESSAGE = "FS operation failed";

const remove = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

        await access(FINAL_FILENAME_PATH, constants.F_OK);
        await unlink(FINAL_FILENAME_PATH);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await remove();
