import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stdin, stdout } from "node:process";

const ERROR_MESSAGE = "STREAM operation failed";

const transform = async () => {
    try {
        const reverseTransform = new Transform({
            transform(chunk, _, callback) {
                const reversedText = chunk?.toString()?.split("")?.reverse()?.join("");

                callback(null, `${reversedText}\n`);
            },
        });

        await pipeline(stdin, reverseTransform, stdout);
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await transform();
