import { join } from "node:path";
import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";

import { extractPathInfo } from "../utils/extract-path-info";

const FINAL_FILENAME = "worker.js";
const ERROR_MESSAGE = "WT operation failed";

const performCalculations = async () => {
    try {
        const { __dirname } = extractPathInfo(import.meta.url);
        const FINAL_FILENAME_PATH = join(__dirname, FINAL_FILENAME);

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
