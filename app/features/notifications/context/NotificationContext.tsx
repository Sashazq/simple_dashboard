"use client";

import React, { createContext, useCallback, useState } from "react";
import { Notification, NotificationType } from "../types";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    message: string,
    type: NotificationType,
    duration?: number,
  ) => void;
  removeNotification: (id: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (message: string, type: NotificationType, duration = 3000) => {
      const id = Date.now().toString();
      const notification: Notification = { id, type, message, duration };

      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [],
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
