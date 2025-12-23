import { Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import HabitStreak from "@/components/HabitStreak";
import HabitTitle from "@/components/HabitTitle";
import { IconSquareRoundedCheckFilled, IconSquareRoundedPlusFilled } from "@tabler/icons-react-native";
import HabitProgressCounter from "@/components/HabitProgressCounter";

export type HabitType = {
  id: number
  title: string
  description: string | null
  today_completed: boolean
  current_streak: number
  type: 'count' | 'inverse',
  target: number | null
  current: number
  schedule: string[]
}

type HabitProps = {
  habit: HabitType
  onPress?: (id: number) => void
};

const Habit = ({habit, onPress}: HabitProps) => {
  const handlePress = () => {
    const target = habit.target ?? 1;
    const willComplete = habit.current + 1 >= target;

    if (willComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPress?.(habit.id);
  };

  return (
    <View style={styles.container}>
      <View>
        <HabitTitle>{habit.title}</HabitTitle>

        <View style={styles.progress}>
          {habit.target && habit.target > 1 && <HabitProgressCounter target={habit.target} current={habit.current}/>}
          <HabitStreak streak={habit.current_streak} />
        </View>
      </View>

      <View>
        <Pressable onPress={handlePress}>
          {habit.target && habit.target > 1
            ? <IconSquareRoundedPlusFilled size={40} />
            : <IconSquareRoundedCheckFilled size={40} />
          }
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    minHeight: 80
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  }
});

export default Habit;