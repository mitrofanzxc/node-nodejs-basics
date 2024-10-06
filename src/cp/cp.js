import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "fresh.txt";
const ERROR_MESSAGE = "CP operation failed";

const spawnChildProcess = async (args) => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH), INIT_DIRNAME);
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

        const cp = fork(FINAL_FILENAME_PATH, args);

        cp.on("message", (message) => {
            console.log(`Received from child process: ${message}`);
        });

        cp.on("close", (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
