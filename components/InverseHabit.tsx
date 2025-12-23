import { Text, StyleSheet, View } from 'react-native';
import HabitStreak from "@/components/HabitStreak";
import HabitTitle from "@/components/HabitTitle";

export type HabitType = {
  id: number
  title: string
  description: string | null
  today_completed: boolean
  current_streak: number
}

type HabitProps = {
  habit: HabitType
};

const InverseHabit = ({habit}: HabitProps) => {
  return (
    <View style={styles.card}>
      <View>
        <HabitTitle>{habit.title}</HabitTitle>
      </View>
      <View>
        <HabitStreak streak={habit.current_streak} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    padding: 4,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});

export default InverseHabit;