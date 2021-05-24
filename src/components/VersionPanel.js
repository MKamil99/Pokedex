import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Dialog, Portal, Text, TouchableRipple } from 'react-native-paper';
import VersionSelector from './VersionSelector';

export default VersionPanel = ({ version, versionList, setVersion }) => {
  const colors = useTheme().colors;
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.header}>Game Version</Text>
      <TouchableRipple onPress={() => setVisible(true)}>
        <VersionSelector version={version} />
      </TouchableRipple>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingTop: 8 }}>
              {versionList.map((version, i) => (
                <View key={i} style={{ paddingBottom: 8 }}>
                  <TouchableRipple
                    onPress={() => {
                      setVersion(version);
                      hideDialog();
                    }}
                  >
                    <VersionSelector version={version} />
                  </TouchableRipple>
                </View>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 8,
    marginTop: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
  },
});
