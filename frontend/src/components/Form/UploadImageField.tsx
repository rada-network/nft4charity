import { useState, useRef, Fragment } from 'react';
import { axios } from '@/lib/axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Dialog, Transition } from '@headlessui/react';
import cameraSVG from '@/assets/icons/camera.svg';
import { dataURIToBlob } from '@/utils/helper';
import { Button } from '../Elements';

type UploadImageFieldProps = {
  label: string;
  className?: string;
  defaultValue: string;
  folder: 'avatar' | 'identifier' | 'album';
  onUploadSuccess: (url: string) => void;
};

export const UploadImageField = (props: UploadImageFieldProps) => {
  const { label, folder, defaultValue, onUploadSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [image, setImage] = useState('');
  const [cropper, setCropper] = useState<any>();
  const ref = useRef<any>();

  const closeModal = () => {
    setOpenDialog(false);
    ref.current.value = null;
  };

  const openModal = () => {
    setOpenDialog(true);
  };

  const onChange = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
      openModal();
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const getCropData = () => {
    closeModal();
    if (typeof cropper !== 'undefined') {
      const file = dataURIToBlob(cropper.getCroppedCanvas().toDataURL());
      const formData = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      formData.append('images', file);
      setLoading(true);
      axios
        .post(`/upload?folder=${folder}`, formData, config)
        .then((res: any) => {
          onUploadSuccess(res[0].Location);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <label className="p4">
        <span className="block text-base font-bold text-gray-700">{label}</span>
        <div className="inline-flex items-center mt-3 mb-3 p-3 border border-slate-500 rounded-lg">
          {defaultValue ? (
            <img src={defaultValue} alt="upload" className="h-14 w-14 object-cover rounded-md" />
          ) : (
            <img src={cameraSVG} alt="upload" className="h-14 w-14 object-cover" />
          )}
          <span className="inline-block bg-blue-600 py-2 px-4 rounded-2xl text-white uppercase ml-4 text-base">
            {loading ? 'loading' : 'upload new image'}
          </span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple={false}
          onChange={onChange}
          ref={ref}
        />
      </label>
      <Transition appear show={openDialog} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-screen-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Crop Image
                </Dialog.Title>
                <div className="py-6">
                  <Cropper
                    style={{ height: 'auto', width: '100%' }}
                    zoomTo={0}
                    aspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance: any) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
                <div className="flex">
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button onClick={getCropData}>Crop</Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
