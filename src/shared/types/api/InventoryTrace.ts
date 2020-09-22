import { QuantityUnit } from './QuantityUnit.enum';

export type InventoryTrace = {
  transactionGuid: string;
  transactionType: string;
  transactionTimestamp: string;
  previousTransactionGuids: string[];
  nextTransactionGuids: string[];
  performMemberGuid: string;
  audineceMemberGuids: string[];
  companyInventoryGuid: string;
  senderCompanyGuid: string;
  senderCompanyName: string;
  senderCompanyContactDetail: string;
  senderCompanyComment: string;
  receiverCompanyGuid: string;
  receiverCompanyName: string;
  receiverCompanyContactDetail: string;
  receiverCompanyComment: string;
  productGuid: string;
  productLocalName: string;
  productQualityCode: string;
  productCategories: string[];
  productClaims: {
    type: string;
    certificationBody: string;
  }[];
  productProduceDate: string;
  transactionLocation: string;
  quantityUnit: QuantityUnit;
  actualQuantity: number;
  wasteQuantity: number;
  pricePerUnit: number;
};
