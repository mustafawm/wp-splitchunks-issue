import { object, string, number } from 'yup';
import { isDecimal } from 'shared/utils/number';

const TransferSchema = object({
  companyInventoryGuid: string().nullable(), // not really, they'll be populated (url params)
  receiverCompanyGuid: string().nullable(), // not really, they'll be populated (url params)
  senderQuantity: number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .typeError('validation.mustBeNumber'),
  senderComment: string().nullable(),
});

export default TransferSchema;

export type TransferProps = {
  companyInventoryGuid: string;
  receiverCompanyGuid: string;
  senderQuantity: string;
  senderComment: string | null;
};
