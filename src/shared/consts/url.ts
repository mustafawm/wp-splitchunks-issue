const base = '/';
const Ref = 'reference';
const Profile = 'profile';
const Services = 'services';
const Company = 'company';
const BlockChain = 'blockchain';

export default {
  web: {
    base,
    login: '/login',
    signup: '/signup',
    checkProfile: '/checkprofile',
    logout: '/logout',
    profile: '/profile',
    products: '/products',
    requests: '/requests',
    published: '/published',
    trace: '/trace',
    not_authed: '/no_access',
  },
  api: {
    authCallBack: `${base}authcallback`,
    logout: `${base}logout`,
    reference: {
      businessType: `${Ref}/businesstype`,
      locationType: `${Ref}/locationtype`,
      locationAreas: `${Ref}/locationarealist`,
      transactionTypes: `${Ref}/transactiontype`,
      transferStatus: `${Ref}/transferrequeststatus`,
      productCategory: `${Ref}/productcategory`,
      commonProduct: `${Ref}/commonproduct`,
      areaUnit: `${Ref}/areaunit`,
      quantityUnit: `${Ref}/quantityunit`,
      qualityCode: `${Ref}/qualitycode`,
      plantSeedType: `${Ref}/plantseedtype`,
      certificationTypes: `${Ref}/certificationtype`,
      certificationBodys: `${Ref}/certificationbody`,
      certificationBodyAll: `${Ref}/certificationbody/all`,
    },
    company: {
      root: Company,
      info: (guid: string): string => `${Company}/${guid}`,
      inventory: (guid: string): string => `${Company}/${guid}/inventory`,
      combine: (guid: string): string => `${Company}/${guid}/inventory/combine`,
      locations: (guid: string): string => `${Company}/${guid}/locations`,
      certificates: (guid: string): string => `${Company}/${guid}/certificates`,
      publish: (guid: string): string => `${Company}/${guid}/inventory/publish`,
      transfer: (guid: string): string =>
        `${Company}/${guid}/inventory/transfer`,
      accept: (guid: string): string =>
        `${Company}/${guid}/inventory/transfer/accept`,
      reject: (guid: string): string =>
        `${Company}/${guid}/inventory/transfer/reject`,
    },
    services: {
      fileUpload: `${Services}/fileupload/document`,
      imageUpload: `${Services}/fileupload/image`,
      softDeletUser: `${Services}/admin/softdeleteuser`,
      dbMigrate: `${Services}/admin/migratedb`,
    },
    profile: {
      root: Profile,
      my: `${Profile}/my`,
      certApproverInfo: `${Profile}/certificationapproverinfo`,
      farmerInfo: `${Profile}/farmerinfo`,
      agentInfo: `${Profile}/agentinfo`,
      companyInfo: `${Profile}/companyinfo`,
      companyInfoLoc: (companyGuid: string): string =>
        `${Profile}/companyinfo/${companyGuid}/location`,
      companyInfoImg: (companyGuid: string): string =>
        `${Profile}/companyinfo/${companyGuid}/image`,
      certificate: (companyGuid: string): string =>
        `${Profile}/companyinfo/${companyGuid}/certificate`,
    },
    blockchain: {
      marketplace: `${BlockChain}/marketplace`,
      product: (productId: string) => `${BlockChain}/product/${productId}`,
      inventory: (inventoryGuid: string) =>
        `${BlockChain}/inventory/${inventoryGuid}`,
      invDetail: (invId: string) => `${BlockChain}/inventory/${invId}/detail`,
    },
  },
};
