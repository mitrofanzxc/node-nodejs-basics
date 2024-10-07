import { parentPort, workerData } from "node:worker_threads";

const ERROR_MESSAGE = "WT operation failed";

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

if (Math.random() > 0.5) {
    throw new Error(ERROR_MESSAGE);
}

const sendResult = () => {
    try {
        const result = nthFibonacci(workerData);

        parentPort.postMessage(result);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

sendResult();
