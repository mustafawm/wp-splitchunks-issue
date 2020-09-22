import * as Yup from 'yup';
import { isDecimal } from 'shared/utils/number';

const PublishSchema = Yup.object({
  companyInventoryGuid: Yup.string().nullable(), // will be populated (url params)
  quantity: Yup.number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .typeError('validation.mustBeNumber'),
  pricePerUnit: Yup.number()
    .required('validation.required')
    .moreThan(0, 'validation.mustBeMoreThan0')
    .typeError('validation.mustBeNumber'),
  // marketplaces: Yup.array().of(Yup.string()).required('validation.required'),
  marketplaces: Yup.string().required('validation.required'), // "temp" converted to string[] opPost,
  senderComment: Yup.string().nullable(),
});

export default PublishSchema;
export type PublishProps = {
  companyInventoryGuid: string;
  quantity: string;
  pricePerUnit: string;
  marketplaces: string;
  senderComment: string;
};
