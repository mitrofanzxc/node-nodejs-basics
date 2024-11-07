import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";

const INIT_DIRNAME = "files";
const COMPRESSED_FILE = "archive.gz";
const OUTPUT_FILE = "fileToCompress.txt";
const ERROR_MESSAGE = "STREAM decompression failed";

const decompress = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);
        const COMPRESSED_FILE_PATH = join(ENTRY_DIRNAME_PATH, COMPRESSED_FILE);
        const OUTPUT_FILE_PATH = join(ENTRY_DIRNAME_PATH, OUTPUT_FILE);

        const readStream = createReadStream(COMPRESSED_FILE_PATH);
        const writeStream = createWriteStream(OUTPUT_FILE_PATH);
        const decompressStream = createGunzip();

        readStream.on("error", console.error);
        writeStream.on("error", console.error);
        writeStream.on("finish", () => console.log("Decompression completed."));

        await pipeline(readStream, decompressStream, writeStream);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await decompress();
