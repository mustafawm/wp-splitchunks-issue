export type AlertColor = 'white' | 'green' | 'red' | 'orange' | 'blue';

export type AlertMessage = {
  message?: string;
  color: AlertColor;
};

export type AlertFunction = (s?: string, c?: AlertColor) => void;
