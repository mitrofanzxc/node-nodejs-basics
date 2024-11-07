import { join } from "node:path";
import { access, constants, readFile } from "node:fs/promises";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const READ_FILENAME = "fileToRead.txt";
const ENCODING = "utf-8";
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const READ_FILE_PATH = join(__dirname, INIT_DIRNAME, READ_FILENAME);

        await access(READ_FILE_PATH, constants.F_OK);

        const content = await readFile(READ_FILE_PATH, ENCODING);

        console.log(content);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await read();
