import { toast } from "sonner";

export const toastInProgress = () =>
  toast("Launching Soon", {
    description: "This feature is in the works.",
    action: {
      label: "Close",
      onClick: () => {},
    },
  });
