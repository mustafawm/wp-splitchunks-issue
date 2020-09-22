import React from 'react';
import { useTranslation } from 'react-i18next';
import { stopPropagation } from 'shared/utils/ui';
import { DZFile } from 'shared/schemas/DZFile';
import RemoveBtn from './RemoveBtn';

export type Props = { file: DZFile; onRemove(f: DZFile): void };

export default function ThumbNail(props: Props) {
  const {
    file: { fileUri, preview, error /*uploadProgress = 0 */ },
    onRemove,
  } = props;
  const { t } = useTranslation();

  return (
    <span
      role="button"
      tabIndex={0}
      className="relative mr-2"
      onClick={stopPropagation}
      onKeyPress={stopPropagation}
    >
      <RemoveBtn file={props.file} onRemove={onRemove} />
      {error ? (
        <span className="utl-error py-10 h-auto w-24 flex flex-col justify-center text-center leading-none bg-gray-400">
          {error.message}
        </span>
      ) : (
        <>
          <img
            src={fileUri || preview}
            loading="lazy"
            className="rounded h-24 w-24"
            alt={`${t('common.product')} ${t('common.thumbnail')}`}
          />
          {/* {!fileUri && (
            <progress
              max="100"
              value={uploadProgress}
              className="absolute bottom-0 w-full rounded-sm h-2"
            />
          )} */}
        </>
      )}
    </span>
  );
}
