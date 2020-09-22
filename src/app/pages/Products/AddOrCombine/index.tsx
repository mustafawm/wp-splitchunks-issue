import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserMustBe } from 'shared/providers/auth';
import { UserRole } from 'shared/types';
import { url } from 'shared/consts';
import Button from 'shared/components/Button';
import AddIcon from './Add.svg';
import CombineIcon from './Combine.svg';

const urlChoices = {
  products: url.web.products,
  add: `${url.web.products}/add`,
  combine: `${url.web.products}/combine`,
};
const choiceBtnClass = 'border rounded-lg w-48 h-48 m-2 p-6';
const iconClass = 'h-20 w-20 mb-1';
const textClass = 'mt-4 font-light text-gray-700';
const navBtnClass = 'w-40 border border-gray-300';

export default function CombineOrCreateProduct() {
  useUserMustBe([UserRole.PackhouseUnit, UserRole.ProcessingUnit]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [choice, setChoice] = useState('');
  const applyClass = (btnChoice: string) =>
    choice === btnChoice
      ? 'border-green-600'
      : 'shadow-lg hover:shadow-xl focus:shadow-xl';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h2>{t('products.createNewProd')}</h2>
        <p className="mt-3 px-2 sm:px-0 text-gray-700">
          {t('products.chooseAddOrCombine')}
        </p>
      </div>
      <div className="w-full mt-6 flex flex-row items-center justify-center">
        <Button
          dataTestid="add"
          color="white"
          onClick={() => setChoice(urlChoices.add)}
          className={`${choiceBtnClass} ${applyClass(urlChoices.add)}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <AddIcon className={iconClass} />
            <p className={textClass}>New product</p>
          </div>
        </Button>
        <Button
          dataTestid="combine"
          color="white"
          onClick={() => setChoice(urlChoices.combine)}
          className={`${choiceBtnClass} ${applyClass(urlChoices.combine)}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <CombineIcon className={iconClass} />
            <p className={textClass}>Combined Products</p>
          </div>
        </Button>
      </div>
      <div className="mt-16 flex justify-between">
        <Button
          text={t('common.cancel')}
          dataTestid="cancel"
          color="white"
          onClick={() => navigate(urlChoices.products)}
          className={navBtnClass}
        />
        <Button
          text={t('common.next')}
          dataTestid="next"
          disabled={!choice}
          className={navBtnClass}
          onClick={() => navigate(choice)}
        />
      </div>
    </div>
  );
}
