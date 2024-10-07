import { argv } from "node:process";

const SEARCH_STRING = "--";
const SEPARATOR = ", ";
const ERROR_MESSAGE = "CLI operation failed";

const parseArgs = () => {
    try {
        const args = argv?.slice(2);

        const result = args.reduce((acc, value, index) => {
            if (index % 2 === 0) {
                const propName = value?.replace(SEARCH_STRING, "");
                const propValue = args?.[index + 1] ?? null;

                acc.push(`${propName} is ${propValue}`);
            }

            return acc;
        }, []);

        console.log(result.join(SEPARATOR));
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

parseArgs();
