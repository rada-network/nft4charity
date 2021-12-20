import clsx from 'clsx';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children } = props;
  return (
    <div className={clsx('mb-3', className)}>
      <label className={clsx('block text-base font-bold text-gray-700', className)}>
        {label}
        <div className="mt-3">{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
