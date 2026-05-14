"use client";

import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export function NotificationContainer() {
  const context = useContext(NotificationContext);

  if (!context) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {context.notifications.map((notification) => {
        const baseClasses =
          "px-4 py-3 rounded-lg shadow-md text-sm font-medium animate-in slide-in-from-top fade-in duration-300";
        const typeClasses = {
          success: "bg-green-500 text-white",
          error: "bg-red-500 text-white",
          info: "bg-blue-500 text-white",
        };

        return (
          <div
            key={notification.id}
            className={`${baseClasses} ${typeClasses[notification.type]}`}
          >
            {notification.message}
          </div>
        );
      })}
    </div>
  );
}
