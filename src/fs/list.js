import { join } from "node:path";
import { access, constants, readdir } from "node:fs/promises";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const ERROR_MESSAGE = "FS operation failed";

const list = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);

        await access(ENTRY_DIRNAME_PATH, constants.F_OK);

        const files = await readdir(ENTRY_DIRNAME_PATH);

        console.log(files);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await list();
