import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@satsangeurope.org",
  name: "Mailtrap Test",
};
