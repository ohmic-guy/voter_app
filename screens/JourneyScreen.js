import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import CheckItem from '../components/CheckItem';
import { colors, fonts, spacing } from '../constants/theme';

const states = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli','Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'];
const checklist = [
  { title: "Check if You're on the Voter List", description: 'Visit voters.eci.gov.in or the Voter Helpline App to search your name on the electoral roll.' },
  { title: 'Register to Vote (if not registered)', description: 'Apply online at voters.eci.gov.in using Form 6. You must be 18+ as of January 1 of the qualifying year.' },
  { title: 'Download or Collect Your Voter ID (EPIC)', description: 'Download your e-EPIC from the Voter Helpline App or collect your physical card from your BLO.' },
  { title: 'Note Your Booth & Constituency', description: 'Find your polling booth address and constituency number on your voter slip or at voters.eci.gov.in.' },
  { title: 'Check Valid Photo ID Documents', description: 'You can vote with EPIC, Aadhaar, Passport, Driving Licence, PAN Card, or any of the 12 ECI-approved documents.' },
  { title: 'Learn About Candidates & Parties', description: 'View candidate affidavits (assets, criminal cases, education) on the ECI Affidavit Portal: affidavit.eci.gov.in.' },
  { title: 'Know About NOTA', description: 'If you reject all candidates, press the NOTA button on the EVM — the last option with a ballot paper + cross symbol.' },
  { title: 'Go Vote!', description: 'Reach your booth between 7 AM–6 PM. Your finger will be marked with indelible ink after voting.' },
];

export default function JourneyScreen() {
  const [selectedState, setSelectedState] = useState('');
  const [checked, setChecked] = useState({});
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progress = useMemo(() => Object.values(checked).filter(Boolean).length / checklist.length, [checked]);
  useEffect(() => { Animated.timing(progressAnim, { toValue: progress, duration: 350, useNativeDriver: false }).start(); }, [progress, progressAnim]);
  const width = progressAnim.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] });

  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.sectionTitle}>Select State / Union Territory</Text>
    <View style={styles.pickerWrap}>{states.map((s)=><Pressable key={s} accessibilityLabel={s} onPress={()=>setSelectedState(s)} style={[styles.stateChip, selectedState===s && styles.stateChipActive]}><Text style={[styles.stateText, selectedState===s&&styles.stateTextActive]}>{s}</Text></Pressable>)}</View>
    {selectedState ? <View style={styles.banner}><Text style={styles.bannerText}>{`📍 For ${selectedState} election dates and booth details, visit voters.eci.gov.in`}</Text></View>:null}
    <View style={styles.progressBar}><Animated.View style={[styles.progressFill,{width}]} /></View>
    <Text style={styles.progressText}>{`${Math.round(progress*100)}% complete`}</Text>
    {checklist.map((item,index)=><CheckItem key={item.title} item={item} checked={!!checked[index]} onToggle={()=>setChecked((p)=>({ ...p, [index]: !p[index] }))} />)}
  </ScrollView>;
}

const styles = StyleSheet.create({ container:{flex:1,backgroundColor:colors.navy},content:{padding:spacing.md,paddingBottom:spacing.xl},sectionTitle:{color:colors.cream,fontFamily:fonts.display,fontSize:20,marginBottom:spacing.sm},pickerWrap:{flexDirection:'row',flexWrap:'wrap',gap:spacing.xs,marginBottom:spacing.md},stateChip:{borderWidth:1,borderColor:'rgba(255,153,51,0.4)',borderRadius:14,paddingHorizontal:spacing.sm,paddingVertical:spacing.xs},stateChipActive:{backgroundColor:'rgba(255,153,51,0.2)',borderColor:colors.saffron},stateText:{color:colors.textLight,fontFamily:fonts.body,fontSize:12},stateTextActive:{color:colors.saffronLight,fontFamily:fonts.bodyMedium},banner:{backgroundColor:'rgba(255,153,51,0.18)',borderRadius:12,padding:spacing.md,marginBottom:spacing.md},bannerText:{color:colors.cream,fontFamily:fonts.body,lineHeight:20},progressBar:{height:10,backgroundColor:colors.navyLight,borderRadius:999,overflow:'hidden',marginBottom:spacing.sm},progressFill:{height:'100%',backgroundColor:colors.saffron},progressText:{color:colors.textLight,fontFamily:fonts.body,marginBottom:spacing.md} });
