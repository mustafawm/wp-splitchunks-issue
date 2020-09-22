/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { DZFile } from 'shared/schemas/DZFile';
import { useAlertFunction } from 'shared/providers/alert';
import Upload from 'shared/svgs/Upload.svg';
import Thumbnail from './ThumbNail';
import { DropzoneProps } from './types';

export default function Dropzone(props: DropzoneProps) {
  const {
    files = [],
    onFilesDrop,
    onFileRemove,
    className,
    placeholder,
    acceptedFiletypes,
  } = props;
  const { t, i18n } = useTranslation();
  const toastIt = useAlertFunction();

  const onDropAccepted = useCallback(
    newFiles => {
      const acceptedFiles = newFiles.map((f: DZFile) =>
        Object.assign(f, { preview: URL.createObjectURL(f) }),
      );
      onFilesDrop(acceptedFiles);
    },
    [files],
  );

  const onDropRejected = useCallback(() => {
    toastIt(t('validation.filetypeNotSupported'), 'red');
  }, [i18n.language]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return (): void => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: acceptedFiletypes,
  });

  const wrapperClassName = classNames(
    'm-auto p-1 bg-green-100 border border-green-400 flex items-baseline focus:outline-none focus:shadow-outline h-auto',
    { 'border-dashed': isDragActive },
    files.length ? 'justify-between' : 'justify-center',
    className,
  );

  const thumbs = files.map((file, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <Thumbnail key={idx} file={file} onRemove={onFileRemove} />
  ));

  return (
    <div {...getRootProps()} className={wrapperClassName}>
      <input {...getInputProps()} tabIndex={0} />
      <div className="flex flex-wrap items-center justify-start">
        {thumbs}
        <span className="text-green-700 flex items-center mx-1 h-24 w-auto">
          <Upload className="fill-current h-5 w-5" />
          <span className="ml-1 underline text-green-800 cursor-pointer">
            {placeholder}
          </span>
        </span>
      </div>
    </div>
  );
}
