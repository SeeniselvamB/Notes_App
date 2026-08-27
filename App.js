import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotes } from './src/hooks/useNotes';
import NoteCard from './src/components/NoteCard';
import NoteForm from './src/components/NoteForm';
import FilterBar from './src/components/FilterBar';
import EmptyState from './src/components/EmptyState';

function App() {
  const {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
    toggleNoteStatus,
    refreshNotes,
  } = useNotes();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // no <FilterType>
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    let filtered = notes;

    if (activeFilter !== 'all') {
      filtered = filtered.filter((note) => note.status === activeFilter);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchLower) ||
          note.content.toLowerCase().includes(searchLower) ||
          note.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [notes, activeFilter, searchTerm]);

  // Calculate note counts
  const noteCounts = useMemo(
    () => ({
      all: notes.length,
      active: notes.filter((note) => note.status === 'active').length,
      complete: notes.filter((note) => note.status === 'complete').length,
    }),
    [notes]
  );

  const handleAddNote = () => {
    setEditingNote(null);
    setIsFormVisible(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsFormVisible(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await addNote(noteData);
      }
      setIsFormVisible(false);
      setEditingNote(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to save note. Please try again.');
    }
  };

  const handleDeleteNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteNote(id),
      },
    ]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshNotes();
    setRefreshing(false);
  };

  const renderNoteCard = ({ item, index }) => (
    <View
      style={[
        styles.cardContainer,
        { marginLeft: index % 2 === 0 ? 0 : 8 },
      ]}
    >
      <NoteCard
        note={item}
        onToggleStatus={toggleNoteStatus}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading your notes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View>
              <Text style={styles.headerTitle}>Interactive Notes</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.totalCount}>
              {noteCounts.all} Total Notes
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onAddNote={handleAddNote}
          noteCounts={noteCounts}
        />

        {filteredNotes.length > 0 ? (
          <FlatList
            data={filteredNotes}
            renderItem={renderNoteCard}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#3B82F6']}
                tintColor="#3B82F6"
              />
            }
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            onAddNote={handleAddNote}
          />
        )}
      </View>

      {/* Note Form Modal */}
      <NoteForm
        note={editingNote}
        isVisible={isFormVisible}
        onClose={() => {
          setIsFormVisible(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {typeof error === 'string' ? error : 'Something went wrong'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 16, color: '#6B7280' },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827',marginLeft: 15 },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  totalCount: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  main: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  row: { justifyContent: 'space-between', paddingHorizontal: 0 },
  cardContainer: { flex: 0.48 },
  listContent: { paddingBottom: 100 },
  errorContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: { color: '#DC2626', fontSize: 14, textAlign: 'center' },
});

export default App;
