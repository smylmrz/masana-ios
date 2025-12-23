import { View, Text, StyleSheet } from "react-native";
import { IconFlameFilled } from "@tabler/icons-react-native";

type HabitStreakProps = {
  streak: number
}

const HabitStreak = ({ streak }: HabitStreakProps) => {
  return (
    <View style={styles.container}>
      <View>
        <IconFlameFilled size={16} color="#ff6b35" />
      </View>
      <Text style={styles.count}>{ streak}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  count: {
    fontSize: 14,
    fontWeight: "500"
  }
})

export default HabitStreak;