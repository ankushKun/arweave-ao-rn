import { View } from 'react-native';
import { install } from "react-native-quick-crypto";
import PolyfillCrypto from 'react-native-webview-crypto';
import Index from './index';
install()
export default function RootLayout() {
  return <View>
    <PolyfillCrypto />
    <Index />
  </View>;
}
