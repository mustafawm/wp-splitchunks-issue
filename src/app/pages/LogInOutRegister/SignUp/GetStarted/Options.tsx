import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { Option, Business } from 'shared/types';
import LoadingOptions from './LoadingOption';
import { businessIconMap } from './consts';

const optClassName =
  'border shadow-lg rounded-lg w-40 h-40 md:w-48 md:h-w-48 lg:h-56 lg:w-56 m-2 sm:mx-4 hover:shadow-xl focus:shadow-xl';

export default function OptionsList(props: {
  options: Option[];
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const { options, isLoading } = props;
  const signupOptions = options.map(opt => ({
    ...businessIconMap[opt.label as Business],
    name: opt.label as Business,
  }));

  if (isLoading) {
    return <LoadingOptions className={optClassName} amount={3} />;
  }
  return (
    <>
      {signupOptions.map(opt => {
        if (!opt) {
          return null;
        }
        const href = {
          to: `register?businessType=${opt.name}`,
        };

        return (
          <Button
            key={opt.name}
            color="white"
            href={href}
            className={optClassName}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <opt.icon className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 mb-1" />
              <h5>{t(`app.businessType.${opt.name}`)}</h5>
            </div>
          </Button>
        );
      })}
    </>
  );
}
