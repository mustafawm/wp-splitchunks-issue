/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { url } from 'shared/consts';
import { UserRole } from 'shared/types';
import Form from 'shared/components/Form';
import ProductSchema, { CombineProductSchema } from 'shared/schemas/Product';
import { useUserCompanyGuid, useUserRoleIs } from 'shared/providers/auth';
import { useAlertFunction } from 'shared/providers/alert';
import FormFields from './FormFields';
import { initialValues as initValsTemplate } from './consts';
import { Props } from './types';
import { extractFormRelatedFields } from './helpers';
import { useSubmitInventory, useFetchProductDetails } from './useApi';

export default function ProductForm(props: Props) {
  const { initialValues = initValsTemplate, title, ...formProps } = props;
  const navigate = useNavigate();
  const toastIt = useAlertFunction();
  const isFarmer = useUserRoleIs([UserRole.Farmer]);
  const companyGuid = useUserCompanyGuid();
  const detailsResult = useFetchProductDetails(companyGuid);
  const [submitIt, { error, isError, isSuccess }] = useSubmitInventory(
    companyGuid,
  );
  const isOnCombinePage = window.location.pathname.endsWith('combine');
  const isCombiningProducts = isOnCombinePage && !isFarmer;

  useEffect(() => {
    if (isSuccess) {
      navigate(url.web.products);
    } else if (isError || detailsResult.isError) {
      toastIt(String(error?.message || detailsResult.error?.message), 'red');
    }
  }, [isSuccess, isError, detailsResult.status]);

  const handleSubmit = useCallback(values => {
    toastIt('');
    submitIt(values);
  }, []);

  const formInitVals = extractFormRelatedFields(
    detailsResult.data || initialValues,
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1>{title}</h1>
      <Form
        useDefaultButtons
        initialValues={formInitVals}
        validationSchema={
          isCombiningProducts ? CombineProductSchema : ProductSchema
        }
        onSubmit={handleSubmit}
        onCancel={(): void => navigate(url.web.products)}
        {...formProps}
      >
        <FormFields isCombiningProducts={isCombiningProducts} />
      </Form>
    </div>
  );
}
