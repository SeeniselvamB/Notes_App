import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export class NotificationService {
    // 📌 Schedule a reminder for a note
    static async scheduleReminder(note) {
        if (!note.reminderTime || !note.repeatDays) return;

        const [hour, minute] = note.reminderTime.split(":").map(Number);

        // Handle everyday reminders
        if (note.repeatDays.includes("everyday")) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Reminder: ${note.title}`,
                    body: note.content || "Your note is due!",
                    sound: true,
                },
                trigger: {
                    hour,
                    minute,
                    repeats: true,
                },
            });
            return;
        }

        // Handle specific days (Mon–Sun)
        for (const day of note.repeatDays) {
            const weekdayMap = {
                sunday: 1,
                monday: 2,
                tuesday: 3,
                wednesday: 4,
                thursday: 5,
                friday: 6,
                saturday: 7,
            };

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Reminder: ${note.title}`,
                    body: note.content || "Your note is due!",
                    sound: true,
                },
                trigger: {
                    weekday: weekdayMap[day.toLowerCase()],
                    hour,
                    minute,
                    repeats: true,
                },
            });
        }
    }

    // 📌 Cancel all reminders (e.g., when deleting notes)
    static async cancelAllReminders() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
}
