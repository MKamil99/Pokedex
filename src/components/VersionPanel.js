import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Dialog, Portal, Text } from 'react-native-paper';

import VersionSelector from './VersionSelector';

export default VersionPanel = ({ version, versionList, setVersion }) => {
  const colors = useTheme().colors;
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.header}>Game Version</Text>
      <VersionSelector version={version} onPress={() => setVisible(true)} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <ScrollView>
            <View style={styles.dialog}>
              <Text style={styles.dialogHeader}>Choose game version</Text>
              {versionList.map((version, i) => (
                <View key={i} style={{ paddingBottom: 8 }}>
                  <VersionSelector
                    version={version}
                    onPress={() => {
                      setVersion(version);
                      hideDialog();
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
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
    marginBottom: 5,
  },
  dialogHeader: {
    textAlign: 'center',
    fontSize: 24,
    paddingBottom: 16,
  },
  dialog: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
