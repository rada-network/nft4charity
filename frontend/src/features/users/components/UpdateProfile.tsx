import { gql, useMutation } from '@apollo/client';
import { PencilIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import * as z from 'zod';

import { UpdateProfileDTO } from '../api/updateProfile';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, UploadImageField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(8, 'Required'),
});

const CreateUser = gql`
  mutation ($user: CreateUserDto!) {
    createUser(user: $user) {
      firstName
      lastName
      email
      password
    }
  }
`;

export const UpdateProfile = () => {
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [createUser] = useMutation(CreateUser);
  const handleSubmit = (values: any) => {
    setIsLoading(true);

    createUser({
      variables: {
        user: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      },
    });

    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <FormDrawer
      isDone={isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button form="update-profile" type="submit" size="sm" isLoading={isLoading}>
          Submit
        </Button>
      }
    >
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
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
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
            <UploadImageField 
              label="Avatar"
              error={formState.errors['avatar']}
              registration={register('avatar')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
