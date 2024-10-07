import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, copyFile, mkdir, readdir } from "node:fs/promises";

const INIT_DIRNAME = "files";
const ERROR_MESSAGE = "FS operation failed";

const list = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);

        await access(ENTRY_DIRNAME_PATH, constants.F_OK);

        const files = await readdir(ENTRY_DIRNAME_PATH);

        console.log(files);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await list();
