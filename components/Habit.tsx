import { Pressable, StyleSheet, View } from 'react-native';
import HabitStreak from "@/components/HabitStreak";
import HabitTitle from "@/components/HabitTitle";
import { IconSquareRoundedCheckFilled } from "@tabler/icons-react-native";

export type HabitType = {
  id: number
  title: string
  description: string | null
  today_completed: boolean
  current_streak: number
  type: 'checkbox' | 'count' | 'inverse',
  schedule: string[]
}

type HabitProps = {
  habit: HabitType
};

const Habit = ({habit}: HabitProps) => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <HabitTitle>{habit.title}</HabitTitle>
        </View>
        <HabitStreak streak={habit.current_streak} />
      </View>

        <Pressable>
          <IconSquareRoundedCheckFilled size={40} />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});

export default Habit;