import Mailjet, { SendEmailV3_1 } from "node-mailjet";
import settings from "./settings";

const mailjet = new Mailjet({
  apiKey: settings.mj_apikey_public,
  apiSecret: settings.mj_apikey_private,
});

export const sendEmail = async (
  email: string,
  templateId: number,
  variables: any
) => {
  if (settings.isLocal) {
    console.info("Send email", { email, templateId, variables });
    return;
  }

  const message: SendEmailV3_1.Message = {
    To: [
      {
        Email: email,
      },
    ],
    From: {
      Email: "my-teams-no-reply@ohappydev.fr",
    },
    Variables: variables,
    TemplateID: templateId,
    TemplateLanguage: true,
  };

  try {
    const aa = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [message],
    });

    console.log({ mail: aa.response });
  } catch (err) {
    console.error("Send email error", err);
  }
};
