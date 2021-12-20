import { useRef } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import cameraSVG from '@/assets/icons/camera.svg';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type UploadImageFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const UploadImageField = (props: UploadImageFieldProps) => {
  const { label, className, registration, error } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type="file"
        ref={inputRef}
        multiple={false}
        accept="image/*"
        className={clsx('hidden', className)}
        {...registration}
      />
      <div
        className="inline-flex flex-row items-center p-4 rounded-3xl border border-gray-300 cursor-pointer"
        onClick={() => inputRef.current && inputRef?.current?.click()}
      >
        <img src={cameraSVG} alt="upload" />
        <span className="block ml-4 uppercase rounded-xl">Upload New Photo</span>
      </div>
    </FieldWrapper>
  );
};
