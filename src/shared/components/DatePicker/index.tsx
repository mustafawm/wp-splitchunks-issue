/**
 * Commented out in favor of native input[type=date] fields
 */

// /* eslint-disable react/jsx-props-no-spreading */
// import React, { ReactElement } from 'react';
// import classNames from 'classnames';
// import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
// import Calendar from 'shared/svgs/Calendar.svg';
// import 'react-datepicker/dist/react-datepicker.css';

// export type Props = ReactDatePickerProps & {
//   containerClassName?: string;
//   iconClassName?: string;
// };

// export default function DateTimePicker(props: Props) {
//   const { containerClassName, iconClassName, ...datePickerProps } = props;

//   const wrapperClassName = classNames(
//     'relative flex items-center text-green-600 w-full',
//     containerClassName,
//   );
//   const iconCss = classNames(
//     'absolute z-10 fill-current w-6 ml-4',
//     iconClassName,
//   );

//   return (
//     <div className={wrapperClassName}>
//       <Calendar className={iconCss} />
//       <DatePicker
//         className="utl-input"
//         placeholderText=" 17/04/2019"
//         dateFormat="dd/MM/yyyy"
//         {...datePickerProps}
//       />
//     </div>
//   );
// }
