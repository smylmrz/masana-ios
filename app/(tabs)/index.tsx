import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import Habit, { HabitType } from "@/components/Habit";
import InverseHabit from "@/components/InverseHabit";
import HabitOverlay from "@/components/HabitOverlay";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedHabit, setSelectedHabit] = useState<HabitType | null>(null);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [habits, setHabits] = useState<HabitType[]>([
    {
      id: 2,
      title: "Do push ups",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 2,
      type: 'count',
      target: 60,
      current: 0,
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    {
      id: 3,
      title: "Some random habit",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 2,
      type: 'count',
      target: 1,
      current: 0,
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    {
      id: 4,
      title: "Some random habit",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 2,
      type: 'count',
      target: 1,
      current: 0,
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  ]);

  const inverseHabits: HabitType[] = [
    {
      id: 1,
      title: "Stop drinking energy drinks",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 106,
      type: 'inverse',
      target: null,
      current: 0,
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  ];

  const handleHabitPress = (habitId: number) => {
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id !== habitId) return habit;

      const target = habit.target ?? 1;
      const newCurrent = habit.current + 1;
      const isCompleted = newCurrent >= target;

      return {
        ...habit,
        current: newCurrent,
        today_completed: isCompleted,
      };
    }));
  };

  const handleCardPress = (habit: HabitType) => {
    setSelectedHabit(habit);
  };

  const handleOverlayClose = () => {
    setSelectedHabit(null);
  };

  const incompleteHabits = habits.filter(h => !h.today_completed);
  const allHabitsCompleted = incompleteHabits.length === 0;

  // Keep selectedHabit in sync with habits state
  const currentSelectedHabit = selectedHabit
    ? habits.find(h => h.id === selectedHabit.id) ?? null
    : null;

  const dotColor = colorScheme === 'dark' ? '#fff' : '#000';
  const inactiveDotColor = colorScheme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.indicatorContainer}>
        <View style={[styles.dot, { backgroundColor: currentPage === 0 ? dotColor : inactiveDotColor }]} />
        <View style={[styles.dot, { backgroundColor: currentPage === 1 ? dotColor : inactiveDotColor }]} />
      </View>

      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        <View key="1" style={styles.page}>
          <View style={{ marginBottom: 8 }}>
            <ThemedText>Do</ThemedText>
          </View>
          {allHabitsCompleted ? (
            <View style={styles.completedContainer}>
              <ThemedText style={styles.completedText}>All habits completed for today!</ThemedText>
            </View>
          ) : (
            <View style={styles.habitsList}>
              {incompleteHabits.map((habitItem) => (
                <Habit
                  key={habitItem.id}
                  habit={habitItem}
                  onPress={handleHabitPress}
                  onCardPress={handleCardPress}
                />
              ))}
            </View>
          )}
        </View>

        <View key="2" style={styles.page}>
          <View style={{ marginBottom: 8 }}>
            <ThemedText>Stay away from</ThemedText>
          </View>
          <View>
            {inverseHabits.map((habitItem) => (
              <InverseHabit key={habitItem.id} habit={habitItem} />
            ))}
          </View>
        </View>
      </PagerView>

      <HabitOverlay
        habit={currentSelectedHabit}
        visible={currentSelectedHabit !== null}
        onClose={handleOverlayClose}
        onComplete={handleHabitPress}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
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
