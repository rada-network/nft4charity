import clsx from 'clsx';

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32',
};

const variants = {
  light: 'text-white',
  primary: 'text-blue-600',
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({ size = 'xl', variant = 'primary', className = '' }: SpinnerProps) => {
  return (
    <>
      <div className="flex justify-center items-center h-60">
        <img
          alt="RADA NFT4Charity"
          src="https://rada.network/images/rada-animate.svg"
          className={clsx('animate-pulse', sizes[size], variants[variant], className)}
        />
      </div>
    </>
  );
};
