import { useFormikContext, FormikValues, FormikState } from 'formik';

type State = {
  values: object;
  errors: object;
  touched: object;
};

export default function useExtractFormikState(): [State, (f: State) => void] {
  const {
    values,
    touched,
    errors,
    setFormikState,
  }: FormikValues = useFormikContext<FormikValues>();

  const state: State = { values, touched, errors };

  function setState(newState: Partial<FormikState<{}>>): void {
    if (JSON.stringify(values) !== JSON.stringify(newState.values)) {
      setFormikState((prev: FormikState<{}>) => ({
        ...prev,
        ...newState,
      }));
    }
  }

  return [state, setState];
}
