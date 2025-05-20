// import { ArweaveSigner } from "@dha-team/arbundles"; // This used core node packages like stream, buffer, crypto, etc.
import { ArweaveSigner } from "@dha-team/arbundles/build/web/bundle"; // This uses web-compatible packages like window.crypto, etc.

// import { connect } from "@permaweb/aoconnect"; // This uses core node packages like stream, buffer, crypto, etc.
import { connect } from "@permaweb/aoconnect/browser"; // This uses web-compatible packages like window.crypto, etc.

// import Arweave from "arweave"; // This uses core node packages like stream, buffer, crypto, etc.
import Arweave from "arweave/web"; // This uses web-compatible packages like window.crypto, etc.

import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
    // This is an arweave wallet JWK, which is used to sign arweave transactions
    const [jwk, setJwk] = useState<any>({ "kty": "RSA", "n": "1su7X09j2yz5za404DIqLkNStgQANICDEqqDT-2uy_tG87m5weTWFTh0baYU2o_stqj0-E46I8pIABjYa-K_uuSW-hHsKfh18Mf0LbNlqUOxjdNmcksA-s4F7dZuPiwbqsfEhat_NWNGV1Ia9D6nla4ETvBX72QyeWB9YjzoR3er7Th4wiwkk_n9jDwi9K2Bm1vWeevuiNGugmIwvzb03IkBzmYuEyCI_85vA15A4I6C3BU-9KOSXWNwzfvwlb6WXHO7iZNUrpA_S_AlIbH8W2iXt1dwXtM7_wR3dZZpaZEyPhqg5mlS12OhxsmYgM9VHUjQnPvCHfWWM2WDIhyC6ccHkFZvJKPANCL9V6gxxgQHkZa3n8aEhr0BzoaLL-EkQ5XhLzrCll-cxvbgO50pOBHywJxhHEhjOk09mPJLxQYJEqLMc7Jm1c4KeWKTBmRBLAdhXyD21QJ189802ZJGlABXGfvGzyyRERBKI1iUx7ypxzY-MXnZTwxkzWHQhXBEujRlbZSTVLjDlhx4ji-9mj5DXh_bTRMBuD-dm5AWEBoaTukf-xlWL40grFpJNRNlL5jE8lz2ic8LjKKgbSHhmhH9KPaSSKnzRQ25Osr5-X-fWswmIcfZrGe8u_DyqV2WOq0U2rWZYOnWC1zS5BGthj8o7e_QfdvCCrFtXwKUvA0", "e": "AQAB", "d": "B7quM_mDXvBCPPGk_7xOYozvWQDRkRIVpV28Q-t36aBRuUt9DEpBeeMmv62gjwzZE8UGYoIpjWy4SWibd--GB9jHpgbd7vlF3A8V7Sg24yar39Kh5InWZp29kODV5ZWx4lGjqnKQ0duQGGxOytoPeAY_BygpL53QjExwkgfUw-_h6aEXKaD-KRvdPrBSJkPVzGVf54j1T0qA4RXvcx--kRNNCnstF41kvBRWvb-3FxRlK2CIV2r__C11BI_ymzDZFNu8IifKfgRz8Fp2u5g9u-oKdLg16mFVPH9tOHe3a1kSNTHl0puYyB0b_Jz37QqtfNRIOzAxvJf26EO0A7tdM7Ezi1Hv3TUAJ2MsKlsDRAkB2Ltx2cC2OUmxl5F82cZQMhU-R8CK8nhSFt_utIFHLFf7zaEB8g9q_MkvsUgxp7rURnwvIsazlT25y0oboROpMRX5wTTNlq9Taf4SGQVWqU1WcU53n-bqDwvs-5ymdV3fptITP4MPrznJe8pE0SCTtNMggQOL-_2LIh04-Vvo28S30mNnc2hJInKNf_P7E3NSXN9I_AJCGDPphXgv08uxAHkafR7EvXMW1YUHZeXzWKXy66nmbOOUiS_j8SQ4Wme__JtHZVqblxqtNN7M41uA8Ij7O-KQxdmGkYxR0yw9nbsaIpXFZ2NmWK3Th_56BfE", "p": "8FaMXtbLZO975I6Y7Pvh3ifs8sOdLM4q3tWOjOndF8c1hFBaw7bcy8hzqOvbK3YgtfEjY8l_Na6wce9je_vOw18rJHxKL-7LVkGlhVFWW6NNs7MgWLyHyqFEh4S_wR5yu9dmcYnisybkFiKKW-VNL7NVLQwSj0XlJidUM2KkDLySFfB_AFNsdWphBoX_GsVkobFxL1ji9CY16-4zbrtN1ELv0M4MINeJr4u6dVJz-8T1jALYzbLLjJ5Mq1XeJwllOOZlMMVEK9LkyQ8a_geO8WAq_91kzhljIxPO-dW0Xkv5MK72bM50myhqXq4yuKhMQfuwJXtkEg9LaH_vSYc8Mw", "q": "5MsS4TqG_fhAyL9H6HDcjPM99rtO7hOPTNU1SB2GzADFxVpSNGFPZg1bVcj4S_U50Nsars582vM6r9ULG42RCTkNWBzKJ8W1l5Y5ex4by7Rd0_YqWDUVqdz6XMO9NGDJjneJUo67oPal6ElkdLzoD30J0sGsV-YZqIE5wEJWqUmp85LQvKWwBYmBGLa6t67cvJ9MDeX6foMBRnp4iB7WS-jX0EmDDsiRvGT4KP6iULtBFDDE4CL3qACBm_HY5d4A2ZHoCJEqXJlwOc-KadiTHMgMpPTdwiGcw2qiV4D20MwE-9Vz4DMmvRv1KjDn5X726wQuG1hy1qkP2AJURgPmvw", "dp": "uSZzzTw8RO4Zy-Hu_eKuBq9LY1o_Y50QecqbnwMrSH43RE-DHPNq9bLfJ2tL1ReT65ZxZRZ94aVKWPvK8GD00J4oZls56-NS0oiQMzyOAtqzqZR9ft7-3aOPX7ds4iHK0dsHGMDY3JtBa6wAWvszk2PcYm_CfI2kEtiJjWyYZReAk1ZLAL1D-NCTHqtr8_vNoqNIRul7Lguhzrga91tkgflvNrUFsudZMtu6MVfr8jGx2ML4sr7jANmSxwvHsNsUF9mmawQNmJVHm3z_lmPMQzeK6MJuPjhgn01LTjzMTzjIKDEhtoD2Y_GmwHoCqS8-UDbNZJLCbQdLWJ32gfak8Q", "dq": "ZBePX-dZ7TuxI-HC1KajZip3_jv9kNwPwf44fB8mvJLN8sPL2MyFjtDjF0l_jsNukrd4GeeN6b-k-g2K-Xfabp1-AAFAU1wEUJfQ99K5OEnlDnjQF5zJqHFbOkALwyFgrCoRcoOtBANDm7aX8xY9s6DxLjm6aw3oRbabDEg5X4AxkLS3CwC1XAbG6ofucbNXMFHEVQQ6rSQk569mka5j8_uehqnSYyJN14yYoF6dphH1q56WUrQZgm8ORKnuSMnxtz1EtJLFZJNf7HqmRB4SZfICzhut9GL-EOPSt9NcpwXKXF4KfpgCJ5NWkymoGdeMsE442Y-9VbnKi6ahNaw5Qw", "qi": "EWwTgaPAFVKUyxbQiG1OPnSVKx_kIhvyrGewR3LtxD-pRkd9buNRiesjG-F7Z_2ygPie65apXlbDjNAORa1HQymM-6q2CWqssr-njdDKKvKz55zJJi92ux7WoNR-niTvZunHA8FAeLDEISoHoRAoXFfez6IrHwENMljbRR73yve9d6Sd2Y-GfB9szWduiejLLMyH6zZcWtns7G4LLVOgCowiv2R3p3ZsGzfhxdKWsD_m6kcs_2Sz67AbgmPJs1TC0CW_D6gf_YCNiTn2PozHRHvIgzLJKpIPTuk9s-g3H9AjoYuEQBlDid-gmFeIpuobbSDFrupC4cEY8H8v_CHNuw" });
    // this would be the wallet address associated with the above JWK
    const [address, setAddress] = useState<string>("Loading..");
    const [error, setError] = useState<string>("");
    const [hash, setHash] = useState<string>("");

    const ar = Arweave.init({});
    const ao = connect({ MODE: "legacy" });
    const signer = new ArweaveSigner(jwk)

    console.log("ar", ar)
    console.log("ao", ao)
    console.log("signer", signer)

    useEffect(() => {
        (async () => {
            console.log("getting address")
            const address = await ar.wallets.jwkToAddress(jwk); // execution stops here
            console.log("address", address) // this doesnot get logged
            setAddress(address);
        })()
    }, [jwk])

    async function addy() {
        console.log("getting addy")
        const addr = await ar.wallets.jwkToAddress(jwk) // execution stops here
        console.log(addr) // this doesnot get logged
    }

    async function newJwk() {
        console.log("creating new jwk")
        const j = await ar.wallets.generate(); // execution stops here
        console.log(j) // this doesnot get logged
        setJwk(j)
    }

    async function testWindowCryptoSubtle() {
        const str = "Hello, world!";
        console.log("hashing", str)
        // window.crypto.subtle is not working probably coz the webview its defined in is not secure
        // If you run this same code in a browser, it works fine
        const hash = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)); // execution stops here
        const hashString = Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        console.log("hashed", hashString) // this doesnot get logged
        setHash(hashString)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
            }}
        >
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{address}</Text>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

            <Button title="new jwk" onPress={newJwk} />
            <Button title="get addy" onPress={addy} />
            <Button title="testWindowCryptoSubtle" onPress={testWindowCryptoSubtle} />
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{hash}</Text>
        </View>
    );
}
