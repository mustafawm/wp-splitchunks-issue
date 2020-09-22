/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';
import { fileTypes } from 'shared/consts';
import { DZFile } from 'shared/schemas/DZFile';
import Dropzone, { DropzoneProps } from 'shared/components/Dropzone';
import { sendFile } from './api';
import { fileExistsAlready, generateDZFile } from './helpers';
import FormField from '../Field';
import { SingleFieldProps } from '../types';

type Props = Omit<DropzoneProps, 'onFilesDrop'> &
  SingleFieldProps & { uploadType: 'image' | 'file' };

const DropzoneField = memo((props: DropzoneProps) => <Dropzone {...props} />);

export default function FormDropzone(props: Props) {
  const { name, label, uploadType, maxFiles = 4, ...dzProps } = props;
  const [, meta, helpers] = useField(name);
  const { setSubmitting } = useFormikContext();
  const { t } = useTranslation();
  const [currentFiles, setCurrentFiles] = useState<DZFile[]>(
    meta.value.map(generateDZFile),
  );

  useEffect(() => {
    // hacky -- after fetching meta.value
    if (!currentFiles.length && meta.value.length) {
      setCurrentFiles(meta.value.map(generateDZFile));
    }
  }, [meta.value]);

  useEffect(() => {
    // isSubmitting if a file doesn't have url or err (request hasn't resolved yet)
    setSubmitting(
      currentFiles.some(curFile => !(curFile.fileUri || curFile.error)),
    );
    // set value to [fileUris]
    helpers.setValue(
      currentFiles.reduce((acc: string[], cur: DZFile) => {
        cur.fileUri && acc.push(cur.fileUri);
        return acc;
      }, []),
    );
  }, [currentFiles]);

  const updateSingleFile = (name: string, prop: Partial<DZFile>): void => {
    setCurrentFiles(curFiles =>
      curFiles.map(file =>
        file.name === name ? Object.assign(file, prop) : file,
      ),
    );
  };

  const uploadFiles = (files: DZFile[]): void => {
    files.forEach(file => {
      sendFile(file, uploadType).then(([err, res]) => {
        updateSingleFile(file.name, {
          error: err ? err : '',
          fileUri: res ? res : '',
        });
      });
    });
  };

  const handleFilesDrop = useCallback(
    (files: DZFile[]): void => {
      helpers.setError('');
      if (currentFiles.length + files.length > maxFiles) {
        const errString = t('validation.maxAlloedFiles', { limit: maxFiles });
        helpers.setError(errString);
      } else if (fileExistsAlready(currentFiles, files)) {
        helpers.setError(t('validation.duplicateNamesNotAllowed'));
      } else {
        setCurrentFiles(curFiles => [...curFiles, ...files]);
        uploadFiles(files);
      }
    },
    [currentFiles],
  );

  const handleFileRemove = useCallback((file: DZFile): void => {
    setCurrentFiles(curFiles =>
      curFiles.filter(curFile => curFile.name !== file.name),
    );
  }, []);

  const acceptedTypes =
    uploadType === 'file'
      ? [...fileTypes.files, ...fileTypes.images]
      : fileTypes.images;

  return (
    <FormField name={name} label={label}>
      <DropzoneField
        {...dzProps}
        files={currentFiles}
        acceptedFiletypes={acceptedTypes}
        onFilesDrop={handleFilesDrop}
        onFileRemove={handleFileRemove}
      />
    </FormField>
  );
}
