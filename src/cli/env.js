import { env } from "node:process";

const SEARCH_STRING = "RSS_";
const SEPARATOR = "; ";
const ERROR_MESSAGE = "CLI operation failed";

const parseEnv = () => {
    try {
        const envVars = Object.entries(env)?.reduce((acc, [key, value]) => {
            if (key?.trim()?.startsWith(SEARCH_STRING)) {
                acc.push(`${key}=${value}`);
            }

            return acc;
        }, []);

        console.log(envVars?.join(SEPARATOR));
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

parseEnv();
