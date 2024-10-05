import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const INIT_DIRNAME = "files";
const COMPRESSED_FILE = "archive.gz";
const OUTPUT_FILE = "fileToCompress.txt";
const ERROR_MESSAGE = "STREAM decompression failed";

const decompress = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const COMPRESSED_FILE_PATH = join(ENTRY_DIRNAME_PATH, COMPRESSED_FILE);
        const OUTPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, OUTPUT_FILE);

        const gunzip = createGunzip();
        const source = createReadStream(COMPRESSED_FILE_PATH);
        const destination = createWriteStream(OUTPUT_FILE_PATH);

        await pipeline(source, gunzip, destination);

        console.log("File decompressed successfully!");
    } catch (error) {
        console.error(ERROR_MESSAGE, error);
    }
};

await decompress();
