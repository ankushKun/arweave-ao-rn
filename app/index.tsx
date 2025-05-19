import { connect } from "@permaweb/aoconnect/browser";
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [jwk, setJwk] = useState<JWKInterface>();
  const [address, setAddress] = useState<string>();

  const ar = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });
  const ao = connect({ MODE: "legacy" })

  // useEffect(() => {
  //   (async () => {
  //     const jwk = await ar.wallets.generate();
  //     const address = await ar.wallets.getAddress(jwk);
  //     setJwk(jwk);
  //     setAddress(address);
  //   })()
  // }, [])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{address || "bruh"}</Text>
    </View>
  );
}
