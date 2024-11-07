import { join } from "node:path";
import { access, constants, unlink } from "node:fs/promises";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToRemove.txt";
const ERROR_MESSAGE = "FS operation failed";

const remove = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        await access(FINAL_FILENAME_PATH, constants.F_OK);
        await unlink(FINAL_FILENAME_PATH);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await remove();
