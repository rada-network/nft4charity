import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
// import designerAvatar from '@/assets/images/designerAvatar.png';
import * as z from 'zod';
import { UpdateProfileDTO } from '../api/updateProfile';

import { ContentLayout } from '@/components/Layout';
import { Form, InputField, TextAreaField, UploadImageField } from '@/components/Form';
import { Button } from '@/components/Elements';

const schema = z.object({
  avatar: z.string(),
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(8, 'Required'),
  description: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  youtube: z.string(),
  instagram: z.string(),
  passportMT: z.string(),
  passportMS: z.string(),
});

const CreateUser = gql`
  mutation ($user: CreateUserDto!) {
    createUser(user: $user) {
      avatar
      firstName
      lastName
      email
      password
      description
      facebook
      twitter
      youtube
      instagram
      passportMT
      passportMS
    }
  }
`;

export const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  const [createUser] = useMutation(CreateUser);
  const handleSubmit = (values: any) => {
    setLoading(true);
    createUser({
      variables: {
        user: {
          avatar: values.avatar,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          facebook: values.facebook,
          twitter: values.twitter,
          youtube: values.youtube,
          instagram: values.instagram,
          passportMT: values.passportMT,
          passportMS: values.passportMS,
        },
      },
    });
    setLoading(false);
  };

  return (
    <ContentLayout title="">
      <div className="m-auto shadow rounded-lg bg-white">
        <Form<UpdateProfileDTO['data'], typeof schema>
          id="update-profile"
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          options={{
            defaultValues: {
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: user?.email,
              password: user?.password,
              description: '',
              facebook: '',
              twitter: '',
              youtube: '',
              instagram: '',
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
                    error={formState.errors['avatar']}
                    registration={register('avatar')}
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
                  <InputField
                    label="Password"
                    type="password"
                    error={formState.errors['password']}
                    registration={register('password')}
                  />
                  <TextAreaField
                    label="Description"
                    error={formState.errors['description']}
                    registration={register('description')}
                  />
                </div>
                <div className="w-1/2 p-5">
                  <h1 className="text-2xl font-bold uppercase mb-5">Your Social Media</h1>
                  {/* <img src={designerAvatar} alt="" className="m-auto w-px-112" /> */}
                  <InputField
                    label="Facebook"
                    error={formState.errors['facebook']}
                    registration={register('facebook')}
                  />
                  <InputField
                    label="Twitter"
                    error={formState.errors['twitter']}
                    registration={register('twitter')}
                  />
                  <InputField
                    label="Youtube"
                    error={formState.errors['youtube']}
                    registration={register('youtube')}
                  />
                  <InputField
                    label="Instagram"
                    error={formState.errors['instagram']}
                    registration={register('instagram')}
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
                    error={formState.errors['passportMT']}
                    registration={register('passportMT')}
                  />
                </div>
                <div className="w-1/2 p-5">
                  <UploadImageField
                    label="Passport MS"
                    error={formState.errors['passportMS']}
                    registration={register('passportMS')}
                  />
                </div>
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="w-1/1 px-5 pb-5">
                  <Button form="update-profile" type="submit" size="sm" isLoading={loading}>
                    Update Profile
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
