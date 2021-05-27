import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

const getTextWithColor = (version, colors) => {
  let text = [];
  let color = [];

  switch (version) {
    case 'red-blue':
      text = ['Red', 'Blue'];
      color = [colors.gameVersion.red, colors.gameVersion.blue];
      break;
    case 'yellow':
      text = ['Yellow'];
      color = [colors.gameVersion.yellow];
      break;
    case 'gold-silver':
      text = ['Gold', 'Silver'];
      color = [colors.gameVersion.gold, colors.gameVersion.silver];
      break;
    case 'crystal':
      text = ['Crystal'];
      color = [colors.gameVersion.crystal];
      break;
    case 'ruby-sapphire':
      text = ['Ruby', 'Sapphire'];
      color = [colors.gameVersion.ruby, colors.gameVersion.sapphire];
      break;
    case 'emerald':
      text = ['Emerald'];
      color = [colors.gameVersion.emerald];
      break;
    case 'firered-leafgreen':
      text = ['FireRed', 'LeafGreen'];
      color = [colors.gameVersion.fireRed, colors.gameVersion.leafGreen];
      break;
    case 'diamond-pearl':
      text = ['Diamond', 'Pearl'];
      color = [colors.gameVersion.diamond, colors.gameVersion.pearl];
      break;
    case 'platinum':
      text = ['Platinum'];
      color = [colors.gameVersion.platinum];
      break;
    case 'heartgold-soulsilver':
      text = ['HeartGold', 'SoulSilver'];
      color = [colors.gameVersion.heartGold, colors.gameVersion.soulSilver];
      break;
    case 'black-white':
      text = ['Black', 'White'];
      color = [colors.gameVersion.black, colors.gameVersion.white];
      break;
    case 'colosseum':
      text = ['Colosseum'];
      color = [colors.gameVersion.colosseum];
      break;
    case 'xd':
      text = ['XD'];
      color = [colors.gameVersion.xd];
      break;
    case 'black-2-white-2':
      text = ['Black 2', 'White 2'];
      color = [colors.gameVersion.black, colors.gameVersion.white];
      break;
    case 'x-y':
      text = ['X', 'Y'];
      color = [colors.gameVersion.X, colors.gameVersion.Y];
      break;
    case 'omega-ruby-alpha-sapphire':
      text = ['Omega Ruby', 'Alpha-Sapphire'];
      color = [colors.gameVersion.omegaRuby, colors.gameVersion.alphaSapphire];
      break;
    case 'sun-moon':
      text = ['Sun', 'Moon'];
      color = [colors.gameVersion.sun, colors.gameVersion.moon];
      break;
    case 'ultra-sun-ultra-moon':
      text = ['Ultra Sun', 'Ultra Moon'];
      color = [colors.gameVersion.ultraSun, colors.gameVersion.ultraMoon];
      break;
    case 'lets-go':
      text = ["Let's Go Pikachu", "Let's Go Eevee"];
      color = [colors.gameVersion.letsGoPikachu, colors.gameVersion.letsGoEevee];
      break;
    case 'sword-shield':
      text = ['Sword', 'Shield'];
      color = [colors.gameVersion.sword, colors.gameVersion.shield];
      break;
  }
  return { text, color };
};

export default function VersionSelector({ version, onPress }) {
  const colors = useTheme().colors;
  const { text, color } = getTextWithColor(version, colors);

  return (
    <TouchableRipple
      onPress={() => onPress()}
      borderless={true}
      style={{ width: '100%', borderRadius: 100 }}
    >
      <View style={styles.container}>
        {text.length > 1 && (
          <View style={styles.textContainer}>
            <View style={[styles.textContainer1, { backgroundColor: color[0] }]}>
              <Text style={styles.text} textShadowColor>
                {text[0]}
              </Text>
            </View>
            <View style={[styles.textContainer2, { backgroundColor: color[1] }]}>
              <Text style={styles.text}>{text[1]}</Text>
            </View>
          </View>
        )}
        {text.length == 1 && (
          <View style={styles.textContainer}>
            <View
              style={[
                styles.textContainer1,
                {
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  backgroundColor: color[0],
                },
              ]}
            >
              <Text style={styles.text}>{text[0]}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    flexDirection: 'row',
  },
  textContainer1: {
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: 'red',
  },
  textContainer2: {
    flex: 1,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  text: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
});
