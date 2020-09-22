import React from 'react';
import Button from 'shared/components/Button';
import Spinner from 'shared/svgs/Spinner.svg';
import Remove from 'shared/svgs/Remove.svg';
import { DZFile } from 'shared/schemas/DZFile';

export default function RemoveBtn(props: {
  file: DZFile;
  onRemove(f: DZFile): void;
}) {
  const { fileUri, uploadProgress = 0 } = props.file;

  if (!fileUri && uploadProgress < 100) {
    return (
      <span className="absolute right-0 w-8 h-8 text-white">
        <Spinner className="fill-current" />
      </span>
    );
  }
  return (
    <Button
      color="white"
      title="Remove image"
      className="absolute right-0 pr-1 pt-1"
      onClick={(evt): void => {
        evt.stopPropagation();
        props.onRemove(props.file);
      }}
    >
      <Remove className="w-5 h-5" />
    </Button>
  );
}
