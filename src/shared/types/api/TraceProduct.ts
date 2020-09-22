import { TransactionType } from './Transaction.enum';

export type TraceProduct = {
  blockchainAudienceMemberIdentities: string[];
  __appUpCompanyInventoryGuid: string;
  __appUpSenderCompanyGuid: string;
  senderCompanyName: string;
  senderCompanyContactDetail: string;
  senderCompanyComment?: string;
  __appUpReceiverCompanyGuid?: string;
  receiverCompanyName?: string;
  receiverCompanyContactDetail?: string;
  receiverCompanyComment?: string;
  __appUpProductGuid: string;
  productLocalName: string;
  productCategories: string[];
  productClaims: string[];
  productProduceDate: string;
  quantityUnit: string;
  actualQuantity: string;
  wasteQuantity?: string;
  transactionLocation: string;
  transactionType:
    | TransactionType.Create
    | TransactionType.Transfer
    | TransactionType.Update;
  blockchainTransactionGuid: string;
  blockchainTimeStamp: string;
  blockchainPerformMemberIdentity?: string;
  nextBlockchainTransactionGuids?: string[];
  blockchianPerformMemberIdentity?: string;
  prevoiusBlockchainTransactionGuids?: string[];
};
