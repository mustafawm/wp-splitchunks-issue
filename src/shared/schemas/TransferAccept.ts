import * as Yup from 'yup';
import { isDecimal } from 'shared/utils/number';

const TransferAcceptSchema = Yup.object({
  inventoryTransferRequestGuid: Yup.string().nullable(),
  receiverCompanyLocationGuid: Yup.string().required('validation.required'),
  acceptQuantity: Yup.number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .typeError('validation.mustBeNumber'),
  returnQuantity: Yup.number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .default(0)
    .typeError('validation.mustBeNumber'),
  wasteQuantity: Yup.number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .typeError('validation.mustBeNumber'),
  receiverComment: Yup.string().nullable(),
});

export default TransferAcceptSchema;
export type TransferAcceptProps = {
  inventoryTransferRequestGuid: string;
  receiverCompanyLocationGuid: string;
  acceptQuantity: string;
  returnQuantity?: string;
  wasteQuantity?: string;
  receiverComment?: string;
};
