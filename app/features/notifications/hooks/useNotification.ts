"use client";

import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { NotificationType } from "../types";

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return {
    success: (message: string) => context.addNotification(message, "success"),
    error: (message: string) => context.addNotification(message, "error"),
    info: (message: string) => context.addNotification(message, "info"),
    notify: (message: string, type: NotificationType) =>
      context.addNotification(message, type),
  };
}
