import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmptyState = ({ searchTerm, activeFilter, onAddNote }) => {
    const isFiltered = searchTerm || activeFilter !== 'all';

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={isFiltered ? 'search-off' : 'note-add'}
                        size={64}
                        color="#D1D5DB"
                    />
                </View>

                <Text style={styles.title}>
                    {isFiltered ? 'No notes found' : 'Start your journey'}
                </Text>

                <Text style={styles.description}>
                    {isFiltered
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Create your first note and begin organizing your thoughts with style.'}
                </Text>

                {!isFiltered && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onAddNote}
                        activeOpacity={0.8}
                    >
                        <Icon name="add" size={20} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Create Your First Note</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 64,
    },
    content: {
        alignItems: 'center',
        maxWidth: 300,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },
});

export default EmptyState;
