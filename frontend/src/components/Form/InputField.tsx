import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  value?: string | number;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error, value } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        value={value}
        className={clsx(
          'appearance-none block w-full px-4 py-2 bg-slate-200 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-cyan-100 sm:text-sm',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
