import React from 'react';
import classNames from 'classnames';
import CheckboxOn from 'shared/svgs/CheckboxOn.svg';
import CheckboxOff from 'shared/svgs/CheckboxOff.svg';
import RadioOn from 'shared/svgs/RadioboxOn.svg';
import RadioOff from 'shared/svgs/RadioboxOff.svg';

type Props = {
  type: string;
  checked?: boolean;
  className?: string;
};

export default function InputIcon(props: Props) {
  const { type, checked = false, className } = props;
  const iconCss = classNames(
    'h-5 w-5 mr-1',
    checked ? 'text-green-600' : 'text-gray-300',
    className,
  );
  let Icon = checked ? RadioOn : RadioOff;
  if (type === 'checkbox') {
    Icon = checked ? CheckboxOn : CheckboxOff;
  }

  return (
    <div className={iconCss}>
      <Icon className="fill-current" aria-label={`${type} icon`} />
    </div>
  );
}
