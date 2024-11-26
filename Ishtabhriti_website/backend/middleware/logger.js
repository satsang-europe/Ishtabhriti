import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { dirname, path } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fsPromise = fs.promises;

export const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
};
