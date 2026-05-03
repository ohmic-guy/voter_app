import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { quizQuestions, scoreMessages } from '../data/quiz';
import { colors, fonts, spacing } from '../constants/theme';

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const progress = useMemo(() => (index + (selected !== null ? 1 : 0)) / quizQuestions.length, [index, selected]);

  if (index >= quizQuestions.length) {
    const message = score === 5 ? scoreMessages.perfect : score >= 3 ? scoreMessages.strong : score >= 1 ? scoreMessages.learning : scoreMessages.start;
    return <View style={styles.container}><View style={styles.scoreCard}><Text style={styles.scoreLabel}>Your Score</Text><Text style={styles.scoreValue}>{score}/5</Text><Text style={styles.scoreMsg}>{message}</Text><Pressable accessibilityLabel="Restart quiz" style={styles.nextBtn} onPress={() => { setIndex(0); setScore(0); setSelected(null); setShowFeedback(false); }}><Text style={styles.nextText}>Restart Quiz</Text></Pressable></View></View>;
  }

  const q = quizQuestions[index];
  const onSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
    setShowFeedback(true);
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  };

  return <View style={styles.container}>
    <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${progress * 100}%` }]} /></View>
    <View style={styles.card}><Text style={styles.qCount}>{`Question ${index + 1} of ${quizQuestions.length}`}</Text><Text style={styles.question}>{q.question}</Text>
      {q.options.map((opt, i) => {
        const correct = selected !== null && i === q.answerIndex;
        const wrong = selected === i && i !== q.answerIndex;
        return <Pressable accessibilityLabel={`Option ${i + 1}`} key={opt} onPress={() => onSelect(i)} style={[styles.option, correct && styles.correct, wrong && styles.wrong]}><Text style={styles.optionText}>{opt}</Text></Pressable>;
      })}
      {showFeedback ? <Animated.View style={[styles.feedback,{opacity:fade}]}><Text style={styles.feedbackText}>{q.explanation}</Text><Pressable accessibilityLabel="Next question" style={styles.nextBtn} onPress={() => { setIndex((v) => v + 1); setSelected(null); setShowFeedback(false); }}><Text style={styles.nextText}>{index===quizQuestions.length-1?'View Score':'Next'}</Text></Pressable></Animated.View> : null}
    </View>
  </View>;
}

const styles = StyleSheet.create({ container:{flex:1,backgroundColor:colors.navy,padding:spacing.md},progressBar:{height:10,backgroundColor:colors.navyLight,borderRadius:999,overflow:'hidden',marginBottom:spacing.md},progressFill:{height:'100%',backgroundColor:colors.saffron},card:{backgroundColor:colors.navyMid,borderRadius:14,padding:spacing.md},qCount:{color:colors.saffronLight,fontFamily:fonts.bodyMedium,marginBottom:spacing.sm},question:{color:colors.cream,fontFamily:fonts.display,fontSize:22,marginBottom:spacing.md},option:{backgroundColor:colors.navyLight,borderRadius:10,padding:spacing.md,marginBottom:spacing.sm,borderWidth:1,borderColor:'transparent'},correct:{backgroundColor:colors.green,borderColor:colors.greenLight},wrong:{backgroundColor:colors.red,borderColor:'#E57368'},optionText:{color:colors.cream,fontFamily:fonts.body,lineHeight:21},feedback:{marginTop:spacing.sm,padding:spacing.md,backgroundColor:'rgba(255,153,51,0.12)',borderRadius:10},feedbackText:{color:colors.creamDark,fontFamily:fonts.body,lineHeight:20,marginBottom:spacing.md},nextBtn:{alignSelf:'flex-start',backgroundColor:colors.saffron,paddingHorizontal:spacing.md,paddingVertical:spacing.sm,borderRadius:10},nextText:{color:colors.navy,fontFamily:fonts.bodySemiBold},scoreCard:{marginTop:spacing.xl,backgroundColor:colors.navyMid,padding:spacing.lg,borderRadius:14},scoreLabel:{color:colors.textLight,fontFamily:fonts.body},scoreValue:{color:colors.saffron,fontFamily:fonts.display,fontSize:44,marginVertical:spacing.sm},scoreMsg:{color:colors.cream,fontFamily:fonts.body,fontSize:16,lineHeight:24,marginBottom:spacing.md} });
