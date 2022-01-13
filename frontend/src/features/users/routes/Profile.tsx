/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import * as z from 'zod';

import { ContentLayout } from '@/components/Layout';
import { Form, InputField, TextAreaField, UploadImageField } from '@/components/Form';
import { Button, Spinner } from '@/components/Elements';
import { useAuth } from '@/hooks/useAuth';
import { CreateProfileDto, UpdateProfileDto } from '../types';
import { CREATE_PROFILE, UPDATE_PROFILE } from '../gql';
import { Navigate } from 'react-router-dom';
import { useNotificationStore } from '@/stores/notifications';
import { removeValueEmptyInObject } from '@/utils/helper';

const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  description: z.string(),
  facebookUrl: z.string().url().or(z.literal('')),
  twitterUrl: z.string().url().or(z.literal('')),
  youtubeUrl: z.string().url().or(z.literal('')),
  instagramUrl: z.string().url().or(z.literal('')),
});

export const Profile = () => {
  const { getProfile, dataProfile } = useAuth();
  const [createProfile, dataCreateProfile] = useMutation(CREATE_PROFILE);
  const [updateProfile, dataUpdateProfile] = useMutation(UPDATE_PROFILE);

  const [avatar, setAvatar] = useState(dataProfile.data?.me?.avatar || '');
  const [passportMT, setPassportMT] = useState(dataProfile.data?.me?.frontIdentifierUrl || '');
  const [passportMS, setPassportMS] = useState(dataProfile.data?.me?.backIdentifierUrl || '');

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (dataProfile.data?.me) {
      setAvatar(dataProfile.data?.me?.avatar || '');
      setPassportMT(dataProfile.data?.me?.frontIdentifierUrl || '');
      setPassportMS(dataProfile.data?.me?.backIdentifierUrl || '');
    }
  }, [dataProfile.data?.me]);

  useEffect(() => {
    if (dataCreateProfile.data?.createUser) {
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'Create Success',
      });
    }
  }, [dataCreateProfile.data?.createUser]);

  useEffect(() => {
    if (dataUpdateProfile.data?.updateUser) {
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'Update Success',
      });
    }
  }, [dataUpdateProfile.data?.updateUser]);

  useEffect(() => {
    if (dataCreateProfile.error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message: dataCreateProfile.error?.message,
      });
    }
  }, [dataCreateProfile.error?.message]);

  useEffect(() => {
    if (dataUpdateProfile.error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Error',
        message: dataUpdateProfile.error?.message,
      });
    }
  }, [dataUpdateProfile.error?.message]);

  const onSubmit = (values: any) => {
    const newValues = removeValueEmptyInObject({
      ...values,
      avatar: avatar,
      frontIdentifierUrl: passportMT,
      backIdentifierUrl: passportMS,
    });
    if (dataProfile.data?.me) {
      const userObject: UpdateProfileDto = {
        ...newValues,
      };
      updateProfile({
        variables: {
          user: userObject,
        },
      });
    } else {
      const userObject: CreateProfileDto = {
        ...newValues,
        wallet: {
          platform: 'ETH',
        },
      };
      createProfile({
        variables: {
          user: userObject,
        },
      });
    }
  };

  if (dataProfile.loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (dataProfile.error) {
    if (dataProfile?.error?.message !== 'User not register') {
      return <Navigate to="/" />;
    }
  }

  return (
    <ContentLayout title="">
      <div className="m-auto shadow rounded-lg bg-white">
        <Form
          id="profile-form"
          onSubmit={onSubmit}
          options={{
            defaultValues: {
              firstName: dataProfile?.data?.me.firstName || '',
              lastName: dataProfile?.data?.me.lastName || '',
              email: dataProfile?.data?.me.email || '',
              description: dataProfile?.data?.me.description || '',
              facebookUrl: dataProfile?.data?.me.facebookUrl || '',
              twitterUrl: dataProfile?.data?.me.twitterUrl || '',
              youtubeUrl: dataProfile?.data?.me.youtubeUrl || '',
              instagramUrl: dataProfile?.data?.me.instagramUrl || '',
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <div className="flex flex-row flex-wrap">
                <div className="w-1/2 p-5">
                  <h1 className="text-2xl font-bold uppercase mb-5">Account Info</h1>
                  <UploadImageField
                    label="Avatar"
                    defaultValue={avatar}
                    folder="avatar"
                    onUploadSuccess={(url: string) => {
                      setAvatar(url);
                    }}
                  />
                  <InputField
                    label="First Name"
                    error={formState.errors['firstName']}
                    registration={register('firstName')}
                  />
                  <InputField
                    label="Last Name"
                    error={formState.errors['lastName']}
                    registration={register('lastName')}
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    error={formState.errors['email']}
                    registration={register('email')}
                  />
                  <TextAreaField
                    label="Description"
                    error={formState.errors['description']}
                    registration={register('description')}
                  />
                </div>
                <div className="w-1/2 p-5">
                  <h1 className="text-2xl font-bold uppercase mb-5">Your Social Media</h1>
                  <InputField
                    label="Facebook"
                    error={formState.errors['facebookUrl']}
                    registration={register('facebookUrl')}
                  />
                  <InputField
                    label="Twitter"
                    error={formState.errors['twitterUrl']}
                    registration={register('twitterUrl')}
                  />
                  <InputField
                    label="Youtube"
                    error={formState.errors['youtubeUrl']}
                    registration={register('youtubeUrl')}
                  />
                  <InputField
                    label="Instagram"
                    error={formState.errors['instagramUrl']}
                    registration={register('instagramUrl')}
                  />
                </div>
              </div>
              <div className="flex flex-grow flex-wrap">
                <h1 className="text-2xl font-bold uppercase ml-5">Upload Passport</h1>
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="w-1/2 p-5">
                  <UploadImageField
                    label="Passport MT"
                    defaultValue={passportMT}
                    folder="identifier"
                    onUploadSuccess={(url: string) => {
                      setPassportMT(url);
                    }}
                  />
                </div>
                <div className="w-1/2 p-5">
                  <UploadImageField
                    label="Passport MS"
                    defaultValue={passportMS}
                    folder="identifier"
                    onUploadSuccess={(url: string) => {
                      setPassportMS(url);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="w-1/1 px-5 pb-5">
                  <Button
                    type="submit"
                    size="sm"
                    isLoading={dataCreateProfile.loading || dataUpdateProfile.loading}
                  >
                    {dataProfile?.data?.me ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </ContentLayout>
  );
};
