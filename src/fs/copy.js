import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants, copyFile, mkdir, readdir } from "node:fs/promises";

const INIT_DIRNAME = "files";
const FINAL_DIRNAME = "files_copy";
const ERROR_MESSAGE = "FS operation failed";

const copy = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const FINAL_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), FINAL_DIRNAME);

        await access(ENTRY_DIRNAME_PATH, constants.F_OK);
        await mkdir(FINAL_DIRNAME_PATH, { recursive: false });

        const files = await readdir(ENTRY_DIRNAME_PATH);

        for (const file of files) {
            const initFile = join(ENTRY_DIRNAME_PATH, file);
            const finalFile = join(FINAL_DIRNAME_PATH, file);

            await copyFile(initFile, finalFile);
        }
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await copy();
