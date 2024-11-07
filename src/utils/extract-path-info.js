import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { showErrorMessage } from "../show-error-message.js";

export const extractPathInfo = (metaUrl) => {
    try {
        const __filename = fileURLToPath(metaUrl);
        const __dirname = dirname(__filename);

        return { __filename, __dirname };
    } catch {
        showErrorMessage();
    }
};
