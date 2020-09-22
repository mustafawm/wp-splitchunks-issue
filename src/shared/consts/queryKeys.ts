import { ArrayQueryKey } from 'react-query';

type QueryKeys = Record<
  | 'myProfile'
  | 'inventory'
  | 'inventories'
  | 'facility'
  | 'facilities'
  | 'productDetails'
  | 'companyLocations'
  | 'transfer'
  | 'transfers'
  | 'requests'
  | 'trace'
  | 'sourceProducts'
  | 'traceInvDetail'
  | 'certificates',
  (s?: string) => ArrayQueryKey
>;

const queryKeys: QueryKeys = {
  myProfile: () => ['MyProfile', 1],
  inventory: (guid?: string) => ['inventory', guid],
  inventories: (companyGuid?: string) => ['inventories', companyGuid],
  sourceProducts: (companyGuid?: string) => ['sourceProducts', companyGuid],
  facility: (companyGuid?: string) => ['facility', companyGuid],
  facilities: () => ['facilities'],
  productDetails: (guid?: string) => [`productDetails`, guid],
  companyLocations: (companyGuid?: string) => ['companyLocations', companyGuid],
  transfer: (guid?: string) => ['transfer', guid],
  transfers: (companyGuid?: string) => ['transfers', companyGuid],
  requests: (companyGuid?: string) => ['requests', companyGuid],
  trace: (inventoryGuid?: string) => ['traceInventory', inventoryGuid],
  traceInvDetail: (inventoryGuid?: string) => ['traceInvDetail', inventoryGuid],
  certificates: (companyGuid?: string) => ['certificates', companyGuid],
};

export default queryKeys;
