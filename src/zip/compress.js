import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToCompress.txt";
const COMPRESSED_FILE = "archive.gz";
const ERROR_MESSAGE = "STREAM compression failed";

const compress = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);
        const INPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);
        const OUTPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, COMPRESSED_FILE);

        const readStream = createReadStream(INPUT_FILE_PATH);
        const writeStream = createWriteStream(OUTPUT_FILE_PATH);
        const compressStream = createGzip();

        await pipeline(readStream, compressStream, writeStream);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await compress();
