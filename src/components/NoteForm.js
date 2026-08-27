import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// Categories and Priorities
const categories = ['General', 'Work', 'Personal'];
const priorities = [
    { key: 'low', label: 'Low', color: '#10B981' },
    { key: 'medium', label: 'Medium', color: '#F59E0B' },
    { key: 'high', label: 'High', color: '#EF4444' },
];

export default function NoteForm({ note, isVisible, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [priority, setPriority] = useState('medium'); // just string now
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const [showPriorityPicker, setShowPriorityPicker] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setCategory(note.category);
            setPriority(note.priority);
        } else {
            setTitle('');
            setContent('');
            setCategory('General');
            setPriority('medium');
        }
    }, [note, isVisible]);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) return;

        onSave({
            title: title.trim(),
            content: content.trim(),
            category,
            priority,
        });

        onClose();
    };

    const isFormValid = title.trim() && content.trim();

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                        <Icon name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{note ? 'Edit Note' : 'New Note'}</Text>
                    <TouchableOpacity
                        onPress={handleSave}
                        style={[
                            styles.headerButton,
                            styles.saveButton,
                            !isFormValid && styles.saveButtonDisabled,
                        ]}
                        disabled={!isFormValid}
                    >
                        <Icon name="check" size={24} color={isFormValid ? '#FFFFFF' : '#9CA3AF'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.titleInput}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter note title..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                        />
                    </View>

                    {/* Category and Priority */}
                    <View style={styles.row}>
                        {/* Category */}
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Category</Text>
                            <TouchableOpacity
                                style={styles.picker}
                                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                            >
                                
                                <Text style={styles.pickerText}>{category}</Text>
                            </TouchableOpacity>

                            {showCategoryPicker && (
                                <View style={styles.pickerOptions}>
                                    {categories.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[
                                                styles.pickerOption,
                                                category === cat && styles.pickerOptionSelected,
                                            ]}
                                            onPress={() => {
                                                setCategory(cat);
                                                setShowCategoryPicker(false);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerOptionText,
                                                    category === cat && styles.pickerOptionTextSelected,
                                                ]}
                                            >
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Priority */}
                        <View style={styles.halfWidth}>
                            <Text style={styles.label}>Priority</Text>
                            <TouchableOpacity
                                style={styles.picker}
                                onPress={() => setShowPriorityPicker(!showPriorityPicker)}
                            >
                                
                                <Text style={styles.pickerText}>{priority}</Text>
                                
                            </TouchableOpacity>

                            {showPriorityPicker && (
                                <View style={styles.pickerOptions}>
                                    {priorities.map((pri) => (
                                        <TouchableOpacity
                                            key={pri.key}
                                            style={[
                                                styles.pickerOption,
                                                priority === pri.key && styles.pickerOptionSelected,
                                            ]}
                                            onPress={() => {
                                                setPriority(pri.key);
                                                setShowPriorityPicker(false);
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerOptionText,
                                                    priority === pri.key && styles.pickerOptionTextSelected,
                                                ]}
                                            >
                                                {pri.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Content Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Content</Text>
                        <TextInput
                            style={styles.contentInput}
                            value={content}
                            onChangeText={setContent}
                            placeholder="Write your content here..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingTop: Platform.OS === 'ios' ? 60 : 12,
    },
    headerButton: { padding: 8, borderRadius: 8 },
    saveButton: { backgroundColor: '#3B82F6' },
    saveButtonDisabled: { backgroundColor: '#E5E7EB' },
    headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
    form: { flex: 1, padding: 16 },
    inputGroup: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    titleInput: {
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 16,
        minHeight: 50,
        textAlignVertical: 'top',
    },
    contentInput: {
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 16,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    row: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    halfWidth: { flex: 1 },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    pickerText: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        marginLeft: 8,
        textTransform: 'capitalize',
    },
    pickerOptions: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        marginTop: 4,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    pickerOption: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    pickerOptionSelected: { backgroundColor: '#EFF6FF' },
    pickerOptionText: { fontSize: 16, color: '#111827', textTransform: 'capitalize' },
    pickerOptionTextSelected: { color: '#3B82F6', fontWeight: '600' },
});
