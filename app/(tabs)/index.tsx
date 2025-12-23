import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import Habit, { HabitType } from "@/components/Habit";
import InverseHabit from "@/components/InverseHabit";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const inverseHabits: HabitType[] = [
    {
      id: 1,
      title: "Stop drinking energy drinks",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 106,
      type: 'inverse',
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  ]

  const habits: HabitType[] = [
    {
      id: 2,
      title: "Some random habit",
      description: "Habit 1 description",
      today_completed: false,
      current_streak: 2,
      type: 'checkbox',
      schedule: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  ]

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
          <View>
            {habits.map((habitItem) => (
              <Habit key={habitItem.id} habit={habitItem} />
            ))}
          </View>
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
});
