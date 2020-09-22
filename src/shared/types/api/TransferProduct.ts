import { QuantityUnit } from './QuantityUnit.enum';
import { TransferStatus } from './TransferStatus.enum';
import { CompanyProduct } from './CompanyProduct';
import { Business } from './Business';

export type TransferProduct = {
  status: TransferStatus;
  senderQuantity: string;
  wasteQuantity: string;
  quantityUnit: QuantityUnit;
  createdDateTimeOffset: string;
  updatedDateTimeOffset: string;
  guid: string;
  companyProduct: CompanyProduct & {
    commonProductGuid: string;
  };
  senderCompanyGuid: string;
  companyInventoryGuid: string;
  receiverCompanyGuid: string;
  senderComment: string;
  senderCompanyBusinessType: Business;
  receiverQuantity: string;
  receiverComment: string;
  receiverCompanyBusinessType: Business;
  inventoryTransferRequestGuid?: string;
  senderCompanyName: string;
  receiverCompanyName: string;
  commonProductName: string;
};
