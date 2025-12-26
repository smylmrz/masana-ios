import { Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import HabitStreak from "@/components/HabitStreak";
import HabitTitle from "@/components/HabitTitle";
import {
  IconSquareRoundedCheckFilled,
  IconSquareRoundedPlusFilled,
  IconSquareRoundedXFilled
} from "@tabler/icons-react-native";
import HabitProgressCounter from "@/components/HabitProgressCounter";
import { HabitType } from "@/types/habit";

type HabitProps = {
  habit: HabitType
  onPress?: (id: number) => void
  onCardPress?: (habit: HabitType) => void
};

const Habit = ({habit, onPress, onCardPress}: HabitProps) => {
  const current = habit.today_log?.current_count ?? 0;
  const target = habit.target_count ?? 1;
  const isInverse = habit.type === 'inverse';

  const handleButtonPress = () => {
    if (isInverse) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      const willComplete = current + 1 >= target;
      if (willComplete) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    onPress?.(habit.id);
  };

  const handleCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCardPress?.(habit);
  };

  const renderIcon = () => {
    if (isInverse) {
      return <IconSquareRoundedXFilled size={40} />;
    }
    return target > 1
      ? <IconSquareRoundedPlusFilled size={40} />
      : <IconSquareRoundedCheckFilled size={40} />;
  };

  return (
    <Pressable style={styles.container} onPress={handleCardPress}>
      <View>
        <HabitTitle>{habit.name}</HabitTitle>

        <View style={styles.progress}>
          {!isInverse && target > 1 && <HabitProgressCounter target={target} current={current}/>}
          <HabitStreak streak={habit.streak} />
        </View>
      </View>

      <View>
        <Pressable onPress={handleButtonPress}>
          {renderIcon()}
        </Pressable>
      </View>
    </Pressable>
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
    minHeight: 80,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  }
});

export default Habit;