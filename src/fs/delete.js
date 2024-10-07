import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, unlink } from "node:fs/promises";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToRemove.txt";
const ERROR_MESSAGE = "FS operation failed";

const remove = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        await access(FINAL_FILENAME_PATH, constants.F_OK);
        await unlink(FINAL_FILENAME_PATH);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await remove();
