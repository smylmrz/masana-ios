import { StyleSheet, View, Pressable } from 'react-native';
import HabitStreak from "@/components/HabitStreak";
import HabitTitle from "@/components/HabitTitle";
import { IconSquareRoundedXFilled } from "@tabler/icons-react-native";

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
    <View style={styles.container}>
      <View>
        <HabitTitle>{habit.title}</HabitTitle>
        <HabitStreak streak={habit.current_streak} />
      </View>

      <View>
        <Pressable>
          <IconSquareRoundedXFilled size={40} />
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
  }
});

export default InverseHabit;