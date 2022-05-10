import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
} from 'react-native';
import generalStyles from '../styles/General';

interface Props {
    title: string;
    imageSrc: { uri: string };
    onPress: (arg: any) => void;
 }

 export default function FeaturedCard({
    title,
    imageSrc,
    onPress,
 }: Props) {
    return (
       <TouchableOpacity style={styles.featuredWrapper} onPress={onPress}>
          <ImageBackground
             source={imageSrc}
             resizeMode="cover"
             style={styles.imageBg}
             imageStyle={{ borderRadius: 10}} 
             >
             <View style={styles.titleWrapper} >
                   <Text style={styles.featuredTitle}>
                      {title}
                   </Text> 
                </View>
          </ImageBackground>
       </TouchableOpacity>
    );
 }

const styles = StyleSheet.create({
    featuredWrapper: {
        width: '100%',
        height: 170,
        borderRadius: 10,
    },
    imageBg: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleWrapper: {
        height: 50,  
        justifyContent:'center'
    },
    featuredTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'TT-Commons-Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    }
});
