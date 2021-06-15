import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Dialog, Portal, Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

import VersionSelector from './VersionSelector';

export default function VersionPanel({ version, activeVersionList, setVersion }) {
  const colors = useTheme().colors;
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const versionList = [
    'red-blue',
    'yellow',
    'gold-silver',
    'crystal',
    'ruby-sapphire',
    'emerald',
    'firered-leafgreen',
    'diamond-pearl',
    'platinum',
    'heartgold-soulsilver',
    'black-white',
    'colosseum',
    'xd',
    'black-2-white-2',
    'x-y',
    'omega-ruby-alpha-sapphire',
    'sun-moon',
    'ultra-sun-ultra-moon',
    'lets-go',
    'sword-shield',
  ];
  const isVersionActive = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const isVersionSelected = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  activeVersionList.forEach((element) => {
    idx = versionList.indexOf(element);
    isVersionActive[idx] = true;
  });

  isVersionSelected[versionList.indexOf(version)] = true;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={styles.header}>Game Version</Text>
      <VersionSelector version={version} onPress={() => setVisible(true)} />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <ScrollView>
            <View style={[styles.dialog, { backgroundColor: colors.card }]}>
              <Text style={styles.dialogHeader}>Choose game version</Text>
              {versionList.map((val, i) => (
                <View key={i} style={{ paddingBottom: 8 }}>
                  <VersionSelector
                    version={val}
                    onPress={() => {
                      setVersion(val);
                      hideDialog();
                    }}
                    active={isVersionActive[i]}
                    selected={isVersionSelected[i]}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderRadius: RFValue(20),
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(12),
    elevation: 8,
    marginTop: RFValue(16),
  },
  header: {
    textAlign: 'center',
    fontSize: RFValue(18),
    marginBottom: RFValue(5),
  },
  dialogHeader: {
    textAlign: 'center',
    fontSize: RFValue(24),
    paddingBottom: RFValue(16),
  },
  dialog: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
  },
});
