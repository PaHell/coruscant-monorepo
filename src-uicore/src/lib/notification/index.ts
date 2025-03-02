import { writable } from "svelte/store";

export { default as NotificationRenderer } from "./NotificationRenderer.svelte";

export type Notification = {
      type: "error" | "success" | "info";
      icon?: string;
      title: string;
      message?: string;
      autoHide?: boolean;
      timeout?: number;
};

export const NotificationContextKey = Symbol("NotificationContext");

export type NotificationContext = {
      clear: () => unknown;
      add: (notification: Notification) => unknown;
      remove: (id: number) => unknown;
}

export const createNotificationStore = (timeout: number) => {
      const { subscribe, set, update } = writable<(Notification & { id: number })[]>([]);
      let notificationCounter = 0;
      let timeoutId: number;
      return {
            subscribe,
            clear: () => set([]),
            add: (notification: Notification) => {
                  const id = notificationCounter++;
                  update((notifications) => [
                        ...notifications,
                        { ...notification, id },
                  ]);
                  if (notification.autoHide) {
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                              update((notifications) => notifications.filter((n) => n.id !== id));
                        }, notification.timeout ?? timeout);
                  }
            },
            remove: (id: number) => {
                  update((notifications) => notifications.filter((n) => n.id !== id));
            },
      };
};
