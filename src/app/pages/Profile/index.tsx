import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazyLoad } from 'shared/utils/ui';
import NotFound404 from 'shared/components/NotFound404';
import NavSidebar from './NavSidebar';
import PersonalDetailsForm from './sections/Personal';
import IdentificationForm from './sections/Identification';
import CertificationForm from './sections/Certifications';
import routes from './routes';

const LocationForm = lazyLoad(() => import('./sections/Location'));

export default function ProfileRouter() {
  return (
    <div className="flex flex-col md:flex-row">
      <NavSidebar className="md:w-1/5 md:mr-8" />
      <div className="w-full sm:max-w-2xl pb-24">
        <Routes>
          <Route path={routes.setting.url} element={<PersonalDetailsForm />} />
          <Route path={routes.id.url} element={<IdentificationForm />} />
          <Route path={routes.location.url} element={<LocationForm />} />
          <Route
            path={routes.certification.url}
            element={<CertificationForm />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </div>
  );
}
