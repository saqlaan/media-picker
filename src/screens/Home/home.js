import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { MediaPicker } from '../../components/MediaPicker';

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);

  const _closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Open media picker" onPress={() => setModalVisible(true)} />
      <MediaPicker isModalVisible={isModalVisible} closeModal={_closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
});

export default Home;
