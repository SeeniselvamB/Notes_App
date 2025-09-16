import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@interactive_notes_app';

export class AsyncStorageService {
    static async saveNotes(notes) {
        try {
            const jsonValue = JSON.stringify(notes);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving notes to AsyncStorage:', error);
            throw error;
        }
    }

    static async loadNotes() {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                const parsedNotes = JSON.parse(jsonValue);
                return parsedNotes.map((note) => ({
                    ...note,
                    createdAt: new Date(note.createdAt),
                    completedAt: note.completedAt ? new Date(note.completedAt) : undefined,
                }));
            }
            return [];
        } catch (error) {
            console.error('Error loading notes from AsyncStorage:', error);
            return [];
        }
    }

    static async clearAllNotes() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing notes from AsyncStorage:', error);
            throw error;
        }
    }

    static async getStorageSize() {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue ? jsonValue.length : 0;
        } catch (error) {
            console.error('Error getting storage size:', error);
            return 0;
        }
    }
}
