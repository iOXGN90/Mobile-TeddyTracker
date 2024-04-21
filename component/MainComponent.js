// MainComponent.js
const MainComponent = ({ navigation }) => {
    const [trackerData, setTrackerData] = useState([]);
  
    const handleInProgress = (task) => {
      setTrackerData(prevData => prevData.filter(item => item !== task));
      navigation.navigate('InProgress', { taskData: task });
    };
  
    const handleFinished = (task) => {
      setTrackerData(prevData => prevData.filter(item => item !== task));
      navigation.navigate('Finished', { taskData: task });
    };
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.taskContainer}>
            {trackerData.map((item, index) => (
              <Tasks
                key={index}
                trackerData={item}
                handleInProgress={() => handleInProgress(item)}
                handleFinished={() => handleFinished(item)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  