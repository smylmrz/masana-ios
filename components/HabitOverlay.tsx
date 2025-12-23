import { Alert, Modal, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconX, IconPencil, IconTrash, IconSnowflake, IconCheck, IconPlus } from '@tabler/icons-react-native';
import { HabitType } from './Habit';
import { ThemedText } from './themed-text';
import HabitStreak from './HabitStreak';

type HabitOverlayProps = {
  habit: HabitType | null;
  visible: boolean;
  onClose: () => void;
  onComplete: (id: number) => void;
};

const HabitOverlay = ({ habit, visible, onClose, onComplete }: HabitOverlayProps) => {
  if (!habit) return null;

  const handleEdit = () => {
    Alert.alert('Edit', 'Edit functionality coming soon');
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Delete functionality coming soon');
  };

  const handleFreeze = () => {
    Alert.alert('Freeze', 'Freeze functionality coming soon');
  };

  const handleComplete = () => {
    const target = habit.target ?? 1;
    const willComplete = habit.current + 1 >= target;

    if (willComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onComplete(habit.id);

    if (willComplete) {
      onClose();
    }
  };

  const formatSchedule = (schedule: string[]) => {
    if (schedule.length === 7) return 'Daily';
    if (schedule.length === 5 && !schedule.includes('saturday') && !schedule.includes('sunday')) {
      return 'Weekdays';
    }
    if (schedule.length === 2 && schedule.includes('saturday') && schedule.includes('sunday')) {
      return 'Weekends';
    }
    return schedule.map(d => d.charAt(0).toUpperCase() + d.slice(0, 2)).join(', ');
  };

  const hasProgress = habit.target && habit.target > 1;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Top actions */}
          <View style={styles.topActions}>
            <Pressable onPress={handleEdit} style={styles.actionButton}>
              <IconPencil size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.actionButton}>
              <IconTrash size={24} color="#fff" />
            </Pressable>
          </View>

          {/* Habit card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText style={styles.habitTitle}>{habit.title}</ThemedText>
              <HabitStreak streak={habit.current_streak} />
            </View>

            {hasProgress && (
              <View style={styles.progressContainer}>
                <ThemedText style={styles.progressText}>
                  <ThemedText style={styles.progressCurrent}>{habit.current}</ThemedText>
                  <ThemedText style={styles.progressDivider}> / {habit.target}</ThemedText>
                </ThemedText>
              </View>
            )}

            <View style={styles.scheduleContainer}>
              <ThemedText style={styles.scheduleText}>
                {formatSchedule(habit.schedule)}
              </ThemedText>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <Pressable onPress={handleFreeze} style={styles.sideAction}>
              <View style={styles.sideActionIcon}>
                <IconSnowflake size={32} color="#4A90D9" />
              </View>
              <ThemedText style={styles.sideActionText}>Skip</ThemedText>
            </Pressable>

            <Pressable onPress={handleComplete} style={styles.completeButton}>
              {hasProgress ? (
                <IconPlus size={40} color="#22C55E" />
              ) : (
                <IconCheck size={40} color="#22C55E" />
              )}
            </Pressable>

            <View style={styles.sideAction}>
              {/* Empty placeholder for layout balance */}
            </View>
          </View>

          {/* Close button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <IconX size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  habitTitle: {
    fontSize: 20,
    fontFamily: 'NexaRound-Bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    marginVertical: 8,
  },
  progressText: {
    fontSize: 24,
  },
  progressCurrent: {
    color: '#22C55E',
    fontFamily: 'NexaRound-Bold',
    fontSize: 24,
  },
  progressDivider: {
    color: '#666',
    fontSize: 24,
  },
  scheduleContainer: {
    marginTop: 8,
  },
  scheduleText: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 24,
  },
  sideAction: {
    alignItems: 'center',
    width: 80,
  },
  sideActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideActionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  completeButton: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
});

export default HabitOverlay;
