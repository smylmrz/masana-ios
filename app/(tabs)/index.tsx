import { Image } from 'expo-image';
import { StyleSheet, View, Text} from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import Habit, { HabitType } from "@/components/Habit";
import InverseHabit from "@/components/InverseHabit";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
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
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <View style={{ marginBottom: 16 }}>
          <View style={{ marginBottom: 8 }}>
            <ThemedText>Do</ThemedText>
          </View>
          <View>
            {habits.map((habitItem) => (
              <Habit key={habitItem.id} habit={habitItem} />
            ))}
          </View>
        </View>

        <View>
          <View style={{ marginBottom: 8 }}>
            <ThemedText>Stay away from</ThemedText>
          </View>
          <View>
            {inverseHabits.map((habitItem) => (
              <InverseHabit key={habitItem.id} habit={habitItem} />
            ))}
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
