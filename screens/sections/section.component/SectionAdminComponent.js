import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Alert, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SectionGuestComponent = ({ sectionInfo }) => {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const handlePressSample = () => {
    console.log("Section ID: " + sectionInfo.section_id);
    Navigation.navigate('AdminTasks', { sectionInfo: sectionInfo });
  };

  const handleLongPress = () => {
    // Copy pin_password to clipboard
    Clipboard.setString(sectionInfo.pin_password);

    // Show alert indicating that pin_password has been copied to clipboard
    Alert.alert(
      'Copied to Clipboard',
      'The PIN has been copied to clipboard.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.sectionContainer} onPress={handlePressSample} onLongPress={handleLongPress}>
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
  body: {
    flex: 1
  },
  sectionContainer: {
    // marginVertical: 15,
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#00A3FF',
    elevation: 10,
    alignSelf: 'center',
  },
  sectionName: {
    marginHorizontal: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 18,
  }
});

export default SectionGuestComponent;