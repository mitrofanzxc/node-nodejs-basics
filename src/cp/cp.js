import { join } from "node:path";
import { spawn } from "node:child_process";
import { stdin, stdout } from "node:process";

import { extractPathInfo } from "../utils/extract-path-info";

const INIT_DIRNAME = "files";
const FINAL_FILENAME = "script.js";
const ERROR_MESSAGE = "CP operation failed";

const spawnChildProcess = async (args) => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, INIT_DIRNAME, FINAL_FILENAME);

        const childProcess = spawn("node", [FINAL_FILENAME_PATH, ...args]);

        stdin.pipe(childProcess.stdin);

        childProcess.stdout.pipe(stdout);

        childProcess.stderr.on("data", (chunk) => {
            console.error(`Error from child process: ${chunk}`);
        });

        childProcess.on("close", (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
