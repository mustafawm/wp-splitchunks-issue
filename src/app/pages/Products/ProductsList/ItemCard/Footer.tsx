import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InventoryPrdocut } from 'shared/types';
import Dropdown from 'shared/components/Dropdown';
import Button from 'shared/components/Button';
import ConfirmDelete from 'shared/components/ConfirmDelete';
import options, { OptKey } from './options';

export default function CardFooter(props: {
  product: InventoryPrdocut;
  onDelete(p: InventoryPrdocut): void;
}) {
  const { t } = useTranslation();
  const { product, onDelete } = props;
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const handleProductClick = useCallback(
    (key: OptKey) => {
      if (key === 'delete') {
        setShowDeleteBox(true);
      }
    },
    [product.companyInventoryGuid],
  );

  const handleDelete = useCallback(() => {
    setShowDeleteBox(false);
    onDelete(product);
  }, [product.companyInventoryGuid]);

  const actions = options.map(opt => {
    const isDisabled =
      product.isLocked && ['edit', 'delete'].includes(opt._key);

    if (opt._key === 'hr') {
      return <hr key={opt._key} />;
    }
    return (
      <Button
        key={opt._key}
        color="white"
        className="w-full p-0 py-2"
        href={opt.href(product)}
        disabled={isDisabled}
        onClick={(): void => handleProductClick(opt._key)}
        title={isDisabled ? t('products.isLockedMsg') : ''}
      >
        <span className="flex items-center font-medium normal-case text-gray-700">
          <opt.Icon className="fill-current h-5 w-5 ml-4 mr-4" />
          <span className="text-black text-xs ">{t(opt.display)}</span>
        </span>
      </Button>
    );
  });

  return (
    <>
      {showDeleteBox && (
        <ConfirmDelete
          title={t('common.delete')}
          message={t('products.confirmDeleteMsg')}
          onYes={handleDelete}
          onNo={(): void => setShowDeleteBox(false)}
        />
      )}
      <Dropdown
        dataTestid={`${product?.companyProduct?.name}-manage`}
        btnContent={t('common.manage')}
        btnClassName="text-green-700 mx-auto"
      >
        {actions}
      </Dropdown>
    </>
  );
}
