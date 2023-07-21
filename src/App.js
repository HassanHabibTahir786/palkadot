import "@polkadot/wasm-crypto/initWasmAsm";
import { useCallback, useState } from "react";

// polka dot
import { MetamaskProvider } from "@unique-nft/accounts/metamask";
import {
  generateAccount,
  getAccountFromMnemonic,
  SignatureType,
} from "@unique-nft/accounts";
import { KeyringProvider } from "@unique-nft/accounts/keyring";
import { KeyringOptions } from "@polkadot/keyring/types";
import Sdk, { Options } from "@unique-nft/sdk";

import { Account, Accounts, SdkSigner } from "@unique-nft/accounts";
import { KeyringLocalProvider } from "@unique-nft/accounts/keyring-local";
import { PolkadotProvider } from "@unique-nft/accounts/polkadot";
// import Home from "./Pages/Home";
// import { HeaderMain } from "./Components/HeaderMain";

import { Route, Routes } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import Loading from "./ConnectivityAssets/Loading";
import { tokenCreation } from "./utils/createtoken";
// import {
//   AttributeType,
//   COLLECTION_SCHEMA_NAME,
// } from "@unique-nft/substrate-client/tokens";
// import { AttributeType } from "@unique-nft/substrate-client/tokens";
function createSdk(account) {
  const options = {
    baseUrl: "https://rest.unique.network/opal/v1",
    signer: account,
  };
  return new Sdk(options);
}

// AttributeType {
//   number = "number",
//   integer = "integer",
//   float = "float",
//   boolean = "boolean",
//   timestamp = "timestamp",
//   string = "string",
//   url = "url",
//   isoDate = "isoDate",
//   time = "time",
//   colorRgba = "colorRgba"
// }

async function createCollection(sdk, address) {
  if (sdk && address) {
    const { parsed, error } = await sdk.collection.creation.submitWaitResult({
      address,
      name: "Test collection",
      description: "My test collection",
      tokenPrefix: "TST",
      // schema: {
      //   schemaName: "1663eh37273h",
      //   schemaVersion: "1.0.0",
      //   coverPicture: {
      //     ipfsCid: "Qmc1Dj8m4z2vcojjJjp348FKffmSjopSFTgATpU8gUx5k1",
      //   },
      //   image: {
      //     urlTemplate:
      //       "https://ipfs.unique.network/ipfs/Qmc1Dj8m4z2vcojjJjp348FKffmSjopSFTgATpU8gUx5k1",
      //   },
      //   attributesSchemaVersion: "1.0.0",
      //   attributesSchema: {
      //     0: {
      //       name: { _: "gender" },
      //       // type: ,
      //       optional: true,
      //       isArray: false,
      //       enumValues: {
      //         0: { _: "male" },
      //         1: { _: "female" },
      //       },
      //     },
      //     1: {
      //       name: { _: "name" },
      //       isArray: false,
      //       optional: false,
      //       // type: "string",
      //     },
      //     2: {
      //       name: { _: "color" },
      //       isArray: true,
      //       // type: "string",
      //       optional: true,
      //       enumValues: {
      //         0: { _: "black" },
      //         1: { _: "white" },
      //         2: { _: "gray" },
      //         3: { _: "brown" },
      //       },
      //     },
      //   },
      // },
    });

    if (error) {
      console.log("Error occurred while creating a collection. ", error);
      process.exit();
    }

    const { collectionId } = parsed;
    if (collectionId) {
      const collection = await sdk.collection.get({ collectionId });
      return { collection };
    } else {
      console.log("No collection");
    }
    // console.log(address, "address", sdk);
    // const data = await sdk?.collection?.create.submitWaitResult({});
    // console.log(data, "data");

    // if (error) {
    //   console.log("Error occurred while creating a collection. ", error);
    //   process.exit();
    // }

    // const { collectionId } = parsed;

    // return sdk.collections.get({ collectionId });
  }
}

// const genrateMenmonicPhases = async () => {
//   // ----------------------------------------
//   //  if you have not nemonics then use
//   const mnemonicPhrase = mnemonicGenerate();
//   const account = await getAccountFromMnemonic({
//     mnemonic: mnemonicPhrase,
//   });
//   return account;
//   // ------------------------------------
// };

function App() {
  const [loading, setLoading] = useState(false);
  // const { chainId, account } = useContext(AppContext);

  // useEffect(() => {
  //   if (account) {
  //     if (chainId !== 56) setNetworkModal(true);
  //   }
  // }, [chainId, account]);
  const submitHandler = useCallback(async () => {
    try {
      setLoading(true);
      // const account = genrateMenmonicPhases();
      // get signer with menmonic phrase
      const signer = await KeyringProvider.fromMnemonic(
        "pattern comic chair bone retreat method twist grace team pepper hour select"
      );
      const address = signer.instance.address;
      console.log(address, "signer");
      const sdk = createSdk(signer);
      console.log(sdk, "sdk");
      // creating collection
      const { collection } = await createCollection(sdk, address);
      console.log("Collection was create. ID: ", collection);
      // creating tokens in the given collection
      const token = await tokenCreation(sdk, address, collection.id);
      console.log(token, "token");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Loading isLoading={loading} />
      <Button onClick={() => submitHandler()}>Mint NFT</Button>
    </div>
  );
}

export default App;
