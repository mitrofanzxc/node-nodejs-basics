import { join } from "node:path";
import { createWriteStream } from "node:fs";
import { stdin } from "node:process";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToWrite.txt";
const ERROR_MESSAGE = "STREAM operation failed";

const write = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const writeStream = createWriteStream(FINAL_FILENAME_PATH);

        stdin.pipe(writeStream);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await write();
