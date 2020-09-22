import { url } from 'shared/consts';
import httpClient from 'shared/services/api';
import { till } from 'shared/utils/api';
import { initVals } from './consts';

export async function registerUser(vals: typeof initVals) {
  const [userErr, user] = await till(
    httpClient.put(url.api.profile.root, vals.user),
  );
  if (userErr || !user) {
    return [userErr, null];
  }

  const [companyErr, company] = await till(
    httpClient.put(url.api.profile.companyInfo, {
      ...vals.company,
      contactPersonGuid: user.guid,
    }),
  );
  if (companyErr || !company) {
    return [companyErr, null];
  }

  const [latitude, longitude] = vals.companyLoc.location;
  delete vals.companyLoc.location;
  const [locErr, loc] = await till(
    httpClient.put(url.api.profile.companyInfoLoc(company.guid), {
      ...vals.companyLoc,
      companyGuid: company.guid,
      name: company.name,
      countryCode: 'THA', // TODO
      latitude,
      longitude,
    }),
  );
  if (locErr || !loc) {
    return [locErr, null];
  }

  return [null, { user, company, loc }];
}
