import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

const NoteCard = ({ note, onToggleStatus, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#EF4444';
            case 'medium': return '#F59E0B';
            case 'low': return '#10B981';
            default: return '#6B7280';
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(date));
    };

    const isComplete = note.status === 'complete';

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isComplete ? '#F0FDF4' : '#FFFFFF' },
            ]}
        >
            {/* Status Toggle Button */}
            <TouchableOpacity
                style={[
                    styles.statusButton,
                    { backgroundColor: isComplete ? '#10B981' : '#E5E7EB' },
                ]}
                onPress={() => onToggleStatus(note.id)}
                activeOpacity={0.7}
            >
                <Icon
                    name={isComplete ? 'check-circle' : 'radio-button-unchecked'}
                    size={20}
                    color={isComplete ? '#FFFFFF' : '#9CA3AF'}
                />
            </TouchableOpacity>

            {/* Priority Indicator */}
            <View
                style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(note.priority) + '20' },
                ]}
            >
                <Icon
                    name="priority-high"
                    size={12}
                    color={getPriorityColor(note.priority)}
                />
                <Text
                    style={[
                        styles.priorityText,
                        { color: getPriorityColor(note.priority) },
                    ]}
                >
                    {note.priority}
                </Text>
            </View>

            {/* Content */}
            <TouchableOpacity
                style={styles.content}
                onPress={() => onEdit(note)}
                activeOpacity={0.7}
            >
                <Text
                    style={[styles.title, isComplete && styles.completedText]}
                    numberOfLines={2}
                >
                    {note.title}
                </Text>

                <Text
                    style={[styles.contentText, isComplete && styles.completedText]}
                    numberOfLines={3}
                >
                    {note.content}
                </Text>

                {/* Category */}
                <View style={styles.categoryContainer}>
                    <Icon name="local-offer" size={14} color="#3B82F6" />
                    <Text style={styles.categoryText}>{note.category}</Text>
                </View>

                {/* Date */}
                <Text style={styles.dateText}>
                    {isComplete && note.completedAt
                        ? `Completed ${formatDate(note.completedAt)}`
                        : `Created ${formatDate(note.createdAt)}`}
                </Text>
            </TouchableOpacity>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onEdit(note)}
                    activeOpacity={0.7}
                >
                    <Icon name="edit" size={18} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(note.id)}
                    activeOpacity={0.7}
                >
                    <Icon name="delete" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: cardWidth,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    statusButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '600',
        marginLeft: 4,
        textTransform: 'capitalize',
    },
    content: { flex: 1 },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        lineHeight: 20,
    },
    contentText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 12,
    },
    completedText: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        color: '#3B82F6',
        marginLeft: 4,
        fontWeight: '500',
    },
    dateText: {
        fontSize: 11,
        color: '#9CA3AF',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
    },
});

export default NoteCard;
