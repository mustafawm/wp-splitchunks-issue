import { Theme, State } from 'react-select';

export const selectCss = {
  menu: (base: object): object => ({ ...base, zIndex: 20 }),
  multiValue: (base: object): object => ({
    ...base,
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    '&:hover': {
      backgroundColor: '#cbd5e0',
    },
  }),
  multiValueLabel: (base: object): object => ({
    ...base,
    color: 'white',
    backgroundColor: '#38a169',
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px',
  }),
  multiValueRemove: (base: object): object => ({
    ...base,
    backgroundColor: '#e2e8f0',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#cbd5e0',
      color: 'black',
    },
  }),
  control: (base: object, state: State): object => ({
    ...base,
    width: '100%',
    borderRadius: '1px',
    minHeight: '44px',
    borderColor: '#E2E8F0',
    ...(state.isFocused && { boxShadow: '0 0 0 2px rgba(66,153,225,0.5)' }),
    '&:hover': {
      border: '1px solid #E2E8F0',
    },
  }),
  option: (provided: object, state: State): object => ({
    ...provided,
    backgroundColor: state.isSelected ? '#38A169' : '#FFF',
    ...(!state.isSelected && {
      '&:hover': {
        background: '#FBFCFC',
        cursor: 'pointer',
      },
    }),
  }),
};

export function setSelectTheme(theme: Theme): Theme {
  return {
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary: '#F2F2F2',
      neutral50: '#ebecee;',
    },
  };
}
