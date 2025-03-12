import toast from "react-hot-toast";

// Toast Success Message (Dark Mode Only)
export function ToastSuccess(message: string) {
  return toast.success(message, {
    style: {
      border: "1px solid #22c55e", // Green border
      padding: "16px",
      color: "#22c55e", // Success text color
      background: "#333", // Dark mode background
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#fff",
    },
  });
}

// Toast Failure Message (Dark Mode Only)
export function ToastFailure(message: string) {
  return toast.error(message, {
    style: {
      border: "1px solid #ef4444", // Red border
      padding: "16px",
      color: "#ef4444", // Error text color
      background: "#333", // Dark mode background
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
}
