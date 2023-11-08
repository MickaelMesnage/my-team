import { requestHasuraAsAdmin } from "@utils/requestHasura";
import settings from "@utils/settings";

export const createScheduledEvent = async (
  route: string,
  schedule_at: string,
  payload: any = {}
) => {
  try {
    const body = {
      type: "create_scheduled_event",
      args: {
        webhook: `${process.env.NHOST_FUNCTIONS_URL}${route}`,
        schedule_at,
        payload,
        headers: [
          {
            name: "nhost-webhook-secret",
            value: settings.nhost_webhook_secret,
          },
        ],
        // include_in_metadata: true,
      },
    };

    const res = await requestHasuraAsAdmin(body);

    if (res.data.event_id) {
      return res.data.event_id;
    } else {
      throw new Error("No event id");
    }
  } catch (error) {
    console.log({ error });
    throw new Error(
      `Error during creation of scheduled event with route ${route} and payload ${JSON.stringify(
        payload
      )}`
    );
  }
};
