import React from 'react';
import Modal from 'shared/components/Modal';
import LoadingSpinner from 'shared/components/Spinner';

export default function SpinnerInABox() {
  return (
    <Modal
      childClass="bg-transparent"
      wrapperClass="w-full flex justify-center items-center bg-transparent"
    >
      <LoadingSpinner />
    </Modal>
  );
}
