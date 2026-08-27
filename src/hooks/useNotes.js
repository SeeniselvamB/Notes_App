import { useState, useEffect, useCallback } from 'react';
import { AsyncStorageService } from '../services/AsyncStorageService';
import { NotificationService } from "../services/NotificationService";

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadNotesFromStorage();
    }, []);

    const loadNotesFromStorage = async () => {
        try {
            setLoading(true);
            setError(null);
            const savedNotes = await AsyncStorageService.loadNotes();
            setNotes(savedNotes);
        } catch (err) {
            setError('Failed to load notes');
            console.error('Error loading notes:', err);
        } finally {
            setLoading(false);
        }
    };

    const saveNotesToStorage = useCallback(async (updatedNotes) => {
        try {
            await AsyncStorageService.saveNotes(updatedNotes);
        } catch (err) {
            setError('Failed to save notes');
            console.error('Error saving notes:', err);
        }
    }, []);
    const addNote = useCallback(async (noteData) => {
        try {
            const newNote = {
                id: Date.now().toString(),
                title: noteData.title || "",
                content: noteData.content || "",
                status: "active",
                category: noteData.category || "General",
                priority: noteData.priority || "medium",
                createdAt: new Date(),
                reminderTime: noteData.reminderTime, // ⬅️ added
                repeatDays: noteData.repeatDays || [], // ⬅️ added
            };

            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            await saveNotesToStorage(updatedNotes);

            // Schedule reminder
            await NotificationService.scheduleReminder(newNote);
        } catch (err) {
            setError("Failed to add note");
            console.error("Error adding note:", err);
        }
    }, [notes, saveNotesToStorage]);

    const updateNote = useCallback(async (id, updates) => {
        try {
            const updatedNotes = notes.map(note =>
                note.id === id ? { ...note, ...updates } : note
            );
            setNotes(updatedNotes);
            await saveNotesToStorage(updatedNotes);
        } catch (err) {
            setError('Failed to update note');
            console.error('Error updating note:', err);
        }
    }, [notes, saveNotesToStorage]);

    const deleteNote = useCallback(async (id) => {
        try {
            const updatedNotes = notes.filter(note => note.id !== id);
            setNotes(updatedNotes);
            await saveNotesToStorage(updatedNotes);
        } catch (err) {
            setError('Failed to delete note');
            console.error('Error deleting note:', err);
        }
    }, [notes, saveNotesToStorage]);

    const toggleNoteStatus = useCallback(async (id) => {
        try {
            const updatedNotes = notes.map(note => {
                if (note.id === id) {
                    const newStatus = note.status === 'active' ? 'complete' : 'active';
                    return {
                        ...note,
                        status: newStatus,
                        completedAt: newStatus === 'complete' ? new Date() : undefined,
                    };
                }
                return note;
            });
            setNotes(updatedNotes);
            await saveNotesToStorage(updatedNotes);
        } catch (err) {
            setError('Failed to toggle note status');
            console.error('Error toggling note status:', err);
        }
    }, [notes, saveNotesToStorage]);

    const clearAllNotes = useCallback(async () => {
        try {
            await AsyncStorageService.clearAllNotes();
            setNotes([]);
        } catch (err) {
            setError('Failed to clear all notes');
            console.error('Error clearing all notes:', err);
        }
    }, []);

    const refreshNotes = useCallback(() => {
        loadNotesFromStorage();
    }, []);

    return {
        notes,
        loading,
        error,
        addNote,
        updateNote,
        deleteNote,
        toggleNoteStatus,
        clearAllNotes,
        refreshNotes,
    };
};
