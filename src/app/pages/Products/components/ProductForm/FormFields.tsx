import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import { useUserCompanyGuid, useProfile } from 'shared/providers/auth';
import Field from 'shared/components/Form/Field';
import Dropzone from 'shared/components/Form/Dropzone';
import ButtonsGroup from 'shared/components/Form/ButtonsGroup';
import Select from 'shared/components/Form/Select';
import DatePicker from 'shared/components/Form/DatePicker';
import SectionTitle from 'shared/components/Form/partials/SectionTitle';
import SourceFields from './SourceFields';

export default function FormFields(props: { isCombiningProducts: boolean }) {
  const { isCombiningProducts } = props;
  const { t } = useTranslation();
  const {
    userProfile: { role },
  } = useProfile();
  const companyGuid = useUserCompanyGuid();

  return (
    <>
      <SectionTitle text={t('products.productInfo')} />
      <div className="utl-two-fields">
        <Select
          aria-label="common product"
          name="companyProduct.commonProductGuid"
          label={t('products.title')}
          labelKey="name"
          valueKey="guid"
          url={url.api.reference.commonProduct}
        />
        <Field
          name="companyProduct.name"
          data-testid="companyProduct.name"
          label={t('common.name')}
          className="utl-input"
          wrapperClassName="w-full sm:w-2/5 sm:mr-2"
        />
      </div>
      <div className="flex flex-col items-end justify-center w-full sm:flex-row">
        <Select
          labelKey="name"
          isMulti
          valueKey="guid"
          aria-label="product categories"
          name="companyProduct.categories"
          label={t('products.category')}
          url={url.api.reference.productCategory}
          className="w-full sm:w-1/2 sm:mr-4"
        />
        <span className="flex w-full items-end mt-2 sm:w-1/2 sm:mt-0">
          <Field
            name="quantity"
            type="number"
            inputMode="decimal"
            className="utl-input"
            wrapperClassName="w-1/2 mr-4"
            label={t('products.quantity')}
          />
          <Select
            name="quantityUnit"
            aria-label="quantity unit"
            label="Unit"
            labelKey="name"
            valueKey="name"
            className="w-1/2"
            url={url.api.reference.quantityUnit}
          />
        </span>
      </div>
      <ButtonsGroup
        type="radio"
        labelKey="name"
        valueKey="name"
        label={t('products.quality')}
        name="companyProduct.qualityCode"
        url={url.api.reference.qualityCode}
        translationKey="products.qualities"
        wrapperClassName="w-full mt-4 sm:w-2/3"
      />
      <span className="utl-two-fields">
        <DatePicker
          name="companyProduct.produceDate"
          label={t('products.harvestedOn')}
          aria-labelledby="harvest date"
        />
        <DatePicker
          name="companyProduct.availabilityDate"
          label={t('products.availableOn')}
          aria-labelledby="availability date"
        />
      </span>
      <Field
        component="textarea"
        name="companyProduct.description"
        label={t('common.description')}
        className="utl-textarea"
      />
      <SectionTitle
        text={`${t(`app.roleBusinessType.${role}`)} ${t('common.info')}`}
      />
      <Select
        name="companyLocationGuid"
        aria-label="company location"
        labelKey="name"
        valueKey="guid"
        className="w-full md:w-1/2 md:pr-2"
        label={t('products.location')}
        url={url.api.company.locations(companyGuid)}
      />
      <Dropzone
        name="companyProduct.images"
        label={t('common.photos')}
        placeholder={t('common.addPhotos')}
        uploadType="image"
      />
      {isCombiningProducts && (
        <>
          <SectionTitle text={t('products.sourceProduct')} />
          <SourceFields companyGuid={companyGuid} />
        </>
      )}
    </>
  );
}
