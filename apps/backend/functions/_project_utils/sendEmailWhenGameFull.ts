import { sendEmail } from "../_utils/sendEmail";

export type EmailData = {
  teamName: string;
  gameTime: string;
  gameDate: string;
  gameUrl: string;
};

const TEMPLATE_ID = 5288063;

export const sendEmailWhenGameFull = async (
  toEmail: string,
  data: EmailData
) => {
  await sendEmail(toEmail, TEMPLATE_ID, data);
};
