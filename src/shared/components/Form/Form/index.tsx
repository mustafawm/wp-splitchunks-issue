/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import SubmitCancelButtons from 'shared/components/Form/SubmitCancel';
import { FormProps } from 'shared/components/Form';
import Persist from './Persist';

export default function FormikForm(props: FormProps) {
  const {
    children,
    useDefaultButtons,
    CustomButtons,
    persist,
    className,
    title,
    submitOnEnter = false,
    ...formProps
  } = props;

  const onKeyDown = useCallback(
    evt => {
      if (!submitOnEnter && evt.keyCode === 13) {
        evt.preventDefault();
      }
    },
    [submitOnEnter],
  );

  const FormButtons = useDefaultButtons
    ? SubmitCancelButtons
    : Boolean(CustomButtons)
    ? CustomButtons
    : null;

  return (
    <>
      <h1 className="text-gray-200">{title}</h1>
      <Formik validateOnMount={false} validateOnChange={false} {...formProps}>
        {(formikVals: FormikProps<FormikValues>) => (
          <Form className={className} onKeyDown={onKeyDown}>
            {persist?.name && <Persist {...persist} />}
            {typeof children === 'function' ? children(formikVals) : children}
            {FormButtons && FormButtons({ ...formikVals, ...formProps })}
          </Form>
        )}
      </Formik>
    </>
  );
}
