import { CertificateProps } from 'shared/schemas/Certificate';

export const initVals: CertificateProps = {
  name: '',
  type: '',
  status: 'SelfClaim',
  description: '',
  certificationBodyGuid: '',
  issuedDate: '',
  expiredDate: '',
  certificateFiles: [],
};
