import { join } from "node:path";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToRead.txt";
const ERROR_MESSAGE = "STREAM operation failed";

const read = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const readStream = createReadStream(FINAL_FILENAME_PATH);

        readStream.on("data", (chunk) => {
            stdout.write(chunk);
        });

        readStream.on("end", () => {
            stdout.write("\n");
        });

        readStream.on("error", (error) => {
            console.error(error.message);
        });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await read();
