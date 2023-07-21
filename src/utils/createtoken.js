// import { CreateTokenNewArguments } from "@unique-nft/substrate-client/t";
// import {
//   UniqueCollectionSchemaToCreate,
//   COLLECTION_SCHEMA_NAME,
//   AttributeType,
// } from "@unique-nft/substrate-client/tokens";

export const tokenCreation = async (sdk, address, collection_Id) => {
  const createTokenArgs = {
    address: address,
    collectionId: collection_Id,
    data: {
      encodedAttributes: {
        0: 0,
        1: [0],
        2: "foo_bar",
      },
      image: {
        ipfsCid: "https://ipfs.io/",
      },
    },
  };
  const result = await sdk.token.create.submitWaitResult(createTokenArgs);
  const { collectionId, tokenId } = result.parsed;
  const token = await sdk.token.get({ collectionId, tokenId });
  return token;
};
