import { ReactElement } from 'react';

export type StepProps = {
  status: 'not-started' | 'current' | 'complete';
  description: ReactElement;
  isLastStep: boolean;
  id: string;
  url: string;
  screenWidth?: number;
};
