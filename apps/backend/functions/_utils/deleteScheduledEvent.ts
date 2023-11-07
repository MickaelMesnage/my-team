import { requestHasuraAsAdmin } from "@utils/requestHasura";

export const deleteScheduledEvent = async (event_id: string) => {
  const body = {
    type: "delete_scheduled_event",
    args: {
      type: "one_off",
      event_id,
    },
  };
  const res = await requestHasuraAsAdmin(body);

  if (res.data.errors) {
    throw new Error(
      `Unable to delete scheduled event ${event_id} - ${JSON.stringify(
        res.data
      )}`
    );
  }
};
