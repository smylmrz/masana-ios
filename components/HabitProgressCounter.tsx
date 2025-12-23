import { View, Text, StyleSheet } from "react-native";

type Props = {
  target: number
  current: number
}

const HabitProgressCounter = ({ target, current }: Props) => {
  return (
    <View>
      <Text style={styles.text}>{current}/{target}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "NexaRound-Bold"
  }
})

export default HabitProgressCounter;