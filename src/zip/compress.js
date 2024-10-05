import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToCompress.txt";
const COMPRESSED_FILE = "archive.gz";
const ERROR_MESSAGE = "STREAM compression failed";

const compress = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const INPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);
        const OUTPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, COMPRESSED_FILE);

        const gzip = createGzip();
        const source = createReadStream(INPUT_FILE_PATH);
        const destination = createWriteStream(OUTPUT_FILE_PATH);

        await pipeline(source, gzip, destination);

        console.log("File compressed successfully!");
    } catch (error) {
        console.error(ERROR_MESSAGE, error);
    }
};

await compress();
