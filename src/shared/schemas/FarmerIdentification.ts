import * as Yup from 'yup';

const FarmerIdSchema = Yup.object({
  contactPersonGuid: Yup.string(), // filled from useAuth()
  farmerId: Yup.string().required('validation.required'),
  farmerPhotoUris: Yup.array().required('validation.required'),
});

export default FarmerIdSchema;
export type FarmerIdProps = {
  contactPersonGuid: string;
  farmerId: string;
  farmerPhotoUris: string[];
};
