import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";

const FINAL_FILENAME = "worker.js";
const ERROR_MESSAGE = "WT operation failed";

const performCalculations = async () => {
    try {
        const ENTRY_FILE_PATH = fileURLToPath(import.meta.url);
        const ENTRY_DIRNAME_PATH = join(dirname(ENTRY_FILE_PATH));
        const FINAL_FILENAME_PATH = join(ENTRY_DIRNAME_PATH, FINAL_FILENAME);

        const numCores = availableParallelism();
        const workers = [];

        const createWorker = (data) =>
            new Promise((resolve) => {
                const worker = new Worker(FINAL_FILENAME_PATH, { workerData: data });

                worker.on("message", (data) => resolve({ status: "resolved", data }));
                worker.on("error", () => resolve({ status: "error", data: null }));
            });

        for (let i = 0; i < numCores; i++) {
            workers.push(createWorker(i + 10));
        }

        const workerResults = await Promise.all(workers);

        console.log(workerResults);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await performCalculations();
