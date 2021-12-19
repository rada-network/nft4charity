import useWeb3Modal from '@/hooks/useWeb3Modal';
import { useNotificationStore } from '@/stores/notifications';
import { mintToken } from '@/web3/web3Client';
import clsx from 'clsx';
import { UseFormRegister, Path, useForm } from 'react-hook-form';

interface IFormValues {
  Address: number;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  className: string;
};

const Input = ({ label, register, required, className }: InputProps) => (
  <div className="text-left">
    <label className={clsx('block text-sm font-medium text-gray-700', className)}>{label}</label>
    <input
      className={clsx(
        'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        className
      )}
      {...register(label, { required })}
    />
  </div>
);

export const Contractor = () => {
  const [provider] = useWeb3Modal();
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit = (data: IFormValues) => {
    console.log(data);
    mintNFT(222);
  };

  const mintNFT = (price: number) => {
    mintToken(provider, 2, price)
      .then((tx: any) => {
        console.log(tx);
        const message = `Transaction complete`;
        useNotificationStore.getState().addNotification({
          type: 'success',
          title: 'Success',
          message,
        });
      })
      .catch((err: any) => {
        console.log(err);
        const message = `Transaction fail with error ${err}`;
        useNotificationStore.getState().addNotification({
          type: 'error',
          title: 'Error',
          message,
        });
      });
  };

  return (
    <>
      <div className="">
        <div className="w-full h-px-530 relative mb-8">
          <div className="absolute top-10 rounded-lg p-5 w-2/3 text-black">
            <h2 className="text-4xl font-Open font-bold">Add to Whitelist</h2>
            <div className="transform w-full bg-white shadow-xl p-5 m-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="flex items-start text-center justify-center cursor-pointer font-bold text-base text-black">
                  <li className="mr-10">
                    <div className="flex">
                      <Input
                        className="w-100"
                        label="Address"
                        register={register}
                        required={false}
                      />
                    </div>
                  </li>
                  <li className="mx-0 my-auto">
                    <button
                      className="btn flex bg-button-purple p-2 rounded-3xl"
                      onClick={() => handleSubmit(onSubmit)}
                    >
                      <span className="font-bold text-xl text-white ml-1">Add to Whitelist</span>
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>

        <div className="w-2/3 m-auto grid grid-cols-2 gap-4 mt-16"></div>
      </div>
    </>
  );
};
