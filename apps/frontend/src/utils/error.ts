import { toast } from "react-toastify";

export type ConsoleErrorProps = {
  filename: string;
  message: string;
};

export const showError = ({ filename, message }: ConsoleErrorProps) => {
  console.error(`Error in ${filename}:\n${message}`);
  toast.error("Une erreur est survenue");
};
