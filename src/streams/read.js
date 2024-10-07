import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fileToRead.txt";
const ERROR_MESSAGE = "STREAM operation failed";

const read = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const ENTRY_DIRNAME_PATH = join(__dirname, INIT_DIRNAME);
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

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
