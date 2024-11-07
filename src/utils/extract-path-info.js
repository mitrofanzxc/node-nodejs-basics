import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ERROR_MESSAGE = "Operation failed";

export const extractPathInfo = (metaUrl) => {
    try {
        const __filename = fileURLToPath(metaUrl);
        const __dirname = dirname(__filename);

        return { __filename, __dirname };
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};
