import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FilterBar = ({
    searchTerm,
    onSearchChange,
    activeFilter,
    onFilterChange,
    onAddNote,
    noteCounts,
}) => {
    const filters = [
        { key: 'all', label: 'All', icon: 'list', count: noteCounts.all },
        { key: 'active', label: 'Active', icon: 'radio-button-unchecked', count: noteCounts.active },
        { key: 'complete', label: 'Complete', icon: 'check-circle', count: noteCounts.complete },
    ];

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search notes..."
                    placeholderTextColor="#9CA3AF"
                    value={searchTerm}
                    onChangeText={onSearchChange}
                />
                {searchTerm.length > 0 && (
                    <TouchableOpacity onPress={() => onSearchChange('')} style={styles.clearButton}>
                        <Icon name="clear" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Filter Tabs and Add Button */}
            <View style={styles.filterRow}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filtersContainer}
                >
                    {filters.map(({ key, label, icon, count }) => (
                        <TouchableOpacity
                            key={key}
                            onPress={() => onFilterChange(key)}
                            style={[
                                styles.filterTab,
                                activeFilter === key && styles.filterTabActive,
                            ]}
                            activeOpacity={0.7}
                        >
                            <Icon
                                name={icon}
                                size={18}
                                color={activeFilter === key ? '#3B82F6' : '#6B7280'}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === key && styles.filterTextActive,
                                ]}
                            >
                                {label}
                            </Text>
                            <View
                                style={[
                                    styles.countBadge,
                                    activeFilter === key && styles.countBadgeActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.countText,
                                        activeFilter === key && styles.countTextActive,
                                    ]}
                                >
                                    {count}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={onAddNote} activeOpacity={0.8}>
                    <Icon name="add" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: { marginRight: 12 },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        paddingVertical: 12,
    },
    clearButton: { padding: 4 },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filtersContainer: { flex: 1, marginRight: 12 },
    filterTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
    },
    filterTabActive: { backgroundColor: '#EFF6FF' },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
        marginLeft: 6,
        marginRight: 8,
    },
    filterTextActive: { color: '#3B82F6' },
    countBadge: {
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    countBadgeActive: { backgroundColor: '#DBEAFE' },
    countText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
    countTextActive: { color: '#3B82F6' },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default FilterBar;
