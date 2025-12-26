import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import Habit, { CardMeasurements } from "@/components/Habit";
import { HabitType } from "@/types/habit";
import HabitOverlay from "@/components/HabitOverlay";
import { getTodayHabits } from "@/api/habits";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const [selectedHabit, setSelectedHabit] = useState<HabitType | null>(null);
  const [cardMeasurements, setCardMeasurements] = useState<CardMeasurements | null>(null);
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchHabits();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchHabits = async () => {
    try {
      const data = await getTodayHabits();
      setHabits(data);
    } catch (error) {
      console.error('Failed to fetch habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHabitPress = (habitId: number) => {
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id !== habitId) return habit;

      const target = habit.target_count ?? 1;
      const current = habit.today_log?.current_count ?? 0;
      const newCurrent = current + 1;
      const isCompleted = newCurrent >= target;

      return {
        ...habit,
        today_status: isCompleted ? 'completed' : 'partial',
        today_log: {
          ...habit.today_log,
          current_count: newCurrent,
        },
      };
    }));
  };

  const handleCardPress = (habit: HabitType, measurements: CardMeasurements) => {
    setCardMeasurements(measurements);
    setSelectedHabit(habit);
  };

  const handleOverlayClose = () => {
    setSelectedHabit(null);
    setCardMeasurements(null);
  };

  // Keep selectedHabit in sync with habits state
  const currentSelectedHabit = selectedHabit
    ? habits.find(h => h.id === selectedHabit.id) ?? null
    : null;

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View key="habits">
          <View style={styles.habitsList}>
            {habits.map((habitItem) => (
              <Habit
                key={habitItem.id}
                habit={habitItem}
                onPress={handleHabitPress}
                onCardPress={handleCardPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <HabitOverlay
        habit={currentSelectedHabit}
        visible={currentSelectedHabit !== null}
        onClose={handleOverlayClose}
        onComplete={handleHabitPress}
        cardMeasurements={cardMeasurements}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  habitsList: {
    gap: 12,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  completedText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
