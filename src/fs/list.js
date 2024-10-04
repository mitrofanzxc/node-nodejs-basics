import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, copyFile, mkdir, readdir } from "node:fs/promises";

const INIT_DIRNAME = "files";
const ERROR_MESSAGE = "FS operation failed";

const list = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);

        await access(ENTRY_DIRNAME_PATH, constants.F_OK);

        const files = await readdir(ENTRY_DIRNAME_PATH);

        console.log(files);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await list();
