import { SuiClient } from '@mysten/sui.js/client';

// node rpc url
const FULLNODE_URL = process.env.REACT_APP_FULLNODE_URL;
// the id of the package of a deployed contract
export const PACKAGE_ID = process.env.REACT_APP_PACKAGE_ID;

export const suiClient = new SuiClient({ url: FULLNODE_URL });