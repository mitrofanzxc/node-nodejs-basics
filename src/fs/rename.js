import { join } from "node:path";
import { access, constants, rename as promiseRename } from "node:fs/promises";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const WRONG_FILENAME = "wrongFilename.txt";
const PROPER_FILENAME = "properFilename.md";
const ERROR_MESSAGE = "FS operation failed";
const ERROR_ENOENT = "ENOENT";

const rename = async () => {
    const { __dirname } = extractPathInfo(import.meta.url);
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
