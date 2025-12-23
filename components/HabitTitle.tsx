import { Text, StyleSheet } from 'react-native';
import { PropsWithChildren } from "react";


const HabitTitle = ({children}: PropsWithChildren) => {
  return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'NexaRound-Bold',
    fontWeight: '600',
  }
});

export default HabitTitle;