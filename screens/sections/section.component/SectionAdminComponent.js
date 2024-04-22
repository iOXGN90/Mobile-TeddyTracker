import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SectionGuestComponent = ({sectionInfo}) => {
    const Navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
  
    const handlePressSample = () => {
      console.log(sectionInfo.section_id);
    };
  
    return (
        <TouchableOpacity style={styles.sectionContainer} onPress={handlePressSample}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',        
          }}>
          <Text style={styles.sectionName}>
            Section:
          </Text>
          <Text style={styles.sectionDescription}>
            {sectionInfo.section_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    body:{
        flex: 1
      },
      sectionContainer: {
        marginVertical: 15,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 15,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: '#ccc',
        borderTopColor: '#ccc',
        borderBottomColor: '#ccc',
        padding: 20,
        // marginTop: -10,
        borderLeftWidth: 10,
        borderLeftColor: '#00A3FF',
        elevation: 10,
        alignSelf: 'center',
        marginHorizontal: 'auto',
      },
      sectionName: {
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
      },
      sectionDescription: {
        fontSize: 18,
      },
  });

export default SectionGuestComponent