import { ArweaveSigner } from "@dha-team/arbundles/build/web/bundle";
import { connect } from "@permaweb/aoconnect/browser";
import Arweave from "arweave/web";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";


export default function Index() {
  const [jwk, setJwk] = useState<any>({
    "kty": "RSA",
    "n": "sIKdi6DBClYckMcCn39aJ88AraxuuDq1jxKsOFizBd4G663UH03Ot7BCEjxxp-fcqCqtFIt4jUIlf98ZMANxi6ZesA15xejBwCdbhxI5okCHz6GVPAVtIDdYNjgk3Dhz3DQ1ubK2TMOBu9tLdtZflbGFn1Hjis_AZlaemK6OoLCJpo5iM1ylwRqvSD7pXnnyqCg4eU4YwYZUwF5XViIWyJXdvdL0d5CzAUR3GPxvJb3SvucRdnUGrR6tWFT8GNZ4tZFydlQCH9jOk4xfvwSxpDop9TQpm7fk8eNCmLflVkHiENeesQsgU2PUi9fDtM8LCQcUp9n4piqdlL5146DzbxPZW9c7Or4LjNnMVHRDNX8LDf4DxeA5Srss4dEPT0JyP-YhqbF3ckiVwqFORzPT1uaYzQB_FjA4gRipIzpDVY5UgEdtkrtQzqUXUSFd7ZmCU2uKUk1Xy5_Z2cdfRqmWPx1v80TWkQr6LojpD-qmbhq5VrtIK1P_c8H4jrVB2e0C7q8LOfNyC9ASLc_sF9yl5n4C1ajEzcwDynGgIQ6DkzNs_nEWe7h4bHFJ4D6XAK2_C4Inw6dMPWzOlQ42yeCaECWnBzOLhPclXFHid5SICaPDNzbxlR0M0orOqbtSO3dIYA5gDFvpxZsOcFP5XT3YWMtyOPDJsPcX54Lus87RGS0",
    "e": "AQAB",
    "d": "D2hbacKOz0Dsjeu9TCBxBXwRlldws8a2LgbGf0Wo3OiAaKa8Fz5yvsCVR-O8VRiNf6V4BczV6Vi-jr6yA2mtie_sIIiQmmjCruwQloYN_16MLGDxtrNPjwodul_kwc9wt6ZcETlrJeDEDJqsJ_O3FMlR_XIHv4h6hkRl5DSKkTbP0TjpFAwwkN5sMg2B0AQrnSejpF0flpcMA13I2GUx4XEJkeYd_mjkY0YvckAo0J3VDWJ8uP8mpcqBfa4vcliYYVsQp4kWRWLmx2Tvv6wgeJI2MugKgMQI6V954vxcec7W9broqJIs0HKsrUdYl0oib7eNQ0io5pJePotwnX3heenfWGbCXtwvfZfoukiCkhpfJUnh7FhAx7r3Rfl3-vt5EBgxoqEXiWKUNAB3VftA_QXIjDExvCPzRGiFMogi3QURsDY7NIX1mMfR5dj-dCruo3U5VJFgUog4XqowHzCfL59JWSl7WlouKJSZYXUv5mc_dIHFAfnItbnb0_HlFUY4Ej7hh_Te3V9CikqJWx7HQymDIhWyGCONDU2s7_Pyg1fOngxOp_p4xv3JUIoErOTZQ2jNihlRfQ7SCJXj_zavh1ndrcSKGGV9DyDdsW9_7PGG5i5msglSdx3Ib9jNKZQlWIjkT-SFyisW_b3M-jqCItsx-0AgLseI7DabuI11ANE",
    "p": "17WYqUEVYj8HIZFDdBKH3366ekYAdSDdhCfXggcCyqMwYj4gr3paei7PoCQGUb2Vx4KvffqMRm3CO5pbirLOJtpYmrUYlZNUiZ9neBFA3h7oNU1UMHxFCXA772STGaE2PnCN_k49JSvA9TsIMbNeXrbLngR1GfLxZ74Pv3Vl4TWiV1P6itcOcboh96vAbqNuum3nkW1ZQO0q4q3ON4WK_DvyDXhZMB6g9Rw7XEqM2Z0qW5BUHEvI_VrPje0Pr3x3n81_FaEg0bxtf7os2BXgTieFuKi9y7Skw4NpvaZQK05wiBlGYxR9fvsx071BjKPgDS6FkefjoHO04UWC1omq3Q", "q": "0XqqJhmqoYORgSE_pC5HcMvaG7kbaFZ2EHTtdPiBHiPnBEaSzxQsa1tMsnVKEF7NmZWsqdgxowZkQWon6mRuwBUy8aZJS84oYzGU43LzWgLdoYjL09qUM108wd8YtRfwfr44bty7g2yjk-17c9clHjUkwFHDai4A7ybqanKlGauDln98bcVSrXnXSHzEvxbuoOBoHoQRDDn-NE6f50V73gIDGIfCNDAoP2f4tQCvO3w0rCjXjt5iOx0eV91LfwCS_WV33PIUa96pzGGrZbd4N-9o_GHywm_uq7b6cJCu7WEnNzYO0fiooNblXpWsON5m_Dor5fYFmd5IVWN27XJ6kQ",
    "dp": "VfcTHfDIGt1PdDs2DJ4N9C3HF0-qgwNUBIT0R-ePXz5l2-EymXxDbooVSJbSxeSuOlKEqcod-TtouuQrMz1LFwTRZuZhI8sRV79lNt55YYwjsopc0O3VfYty91a3oPE0cvHcRMrdZ2Dmh1S9UUFQjKKAxzqziGHffx6pm_2nWndLeU4IfShzozMwskmKaQ1M5ZNDRBu2BEAAZVIq6smXuCoTrvaVZK3wK37S0VcMhvUxmkgMnTI-qWl1afRd2evaqJ721KHgOHXFla-Wi488UylBC3SEHxigySIoE-Kh9IBQLI0WFgpmcSKemunDo87zTY2KwbkOaDV0kopnOCSpKQ",
    "dq": "G_8v9G2jv3htHvwJnHDO_YVRPjlML3K2ztZB0ktQPm3_9zNTdbe1hBestYE1h-CTy_4UGJMbdzVoetGsSghoQOXUbDWUQDxqa295_bgkTBhr9KXq0AK7oe3JLAQcMj_j1ZyowDBiI1uGtUOdJ0tO262wnr-OxYcmetARrm5qIHcq3Bdn0uf3d9X77uU2CnAPLpMvdzyhZqftkKIdfvRrbK2KKmIik4UILAlCVTalNOcRxxyiSqbwLARlRMr_xxaVjqZcEbyM_CnDOdyn4q1VtOwbdPfGUTRSisKm0BqWNoWwjxF7g5afOvfdqfmJDgSzcOx5Z3-tGfZ6Zmcnwu508Q",
    "qi": "Oo2GJguLtWzLl7A4R5-Zq9Q1OkJXMTs7V4pb7N3DVC9EhlIYhL6j7S-lsNaKR0bJ0QFuIsbyNCo_1D9R5elBJOJOt1SoIH4oW_q2pAhYMKIZHao1W7872RhntzznCnTRsKOoMNWfepvbnxEKJU3-iUVX2YHIe4lOaWHAYUSjuJUVSpqyjtDBWH9n2wvOkuZ36yh-OeJ1g0XdvFNUR13vm1r0fXqOKYuEtJoCy44o84GbONJm3HzrwhcckdCjLBI46-KvhsOh-loR7mO-Zm86suUU_jUyoqEi53uhF-sz_Y9j-xJzUpwD6QcqgSDDxHSPC_dyDhM6jxed4_8Vyeu30A"
  });
  const [address, setAddress] = useState<string>("aaaaa");

  const ao = connect({ MODE: "legacy" })
  const ar = new ArweaveSigner(jwk)

  // console.log(ao)

  useEffect(() => {
    // console.log(window.crypto.subtle)
    (async () => {
      console.log(Arweave)
      console.log("init")
      const ar = Arweave.init({});
      console.log("init2")
      const jwk = await ar.wallets.generate();
      console.log("init3")
      console.log(jwk)
      const address = await ar.wallets.getAddress(jwk);
      console.log("init4")
      console.log(address)
      setJwk(jwk);
      setAddress(address);
    })()
  }, [])

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
