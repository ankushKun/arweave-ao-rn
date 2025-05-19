import { View } from 'react-native';
import 'react-native-get-random-values';
// import { install } from "react-native-quick-crypto";
import PolyfillCrypto from 'react-native-webview-crypto';
import Index from './index';
// install()

export default function RootLayout() {
  return <View style={{ flex: 1 }}>
    <PolyfillCrypto />
    <Index />
  </View>;
}
