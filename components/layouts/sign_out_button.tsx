import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query';
import { signOutUser } from "../../requests/sessions";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  // const router = useRouter()
  // const mutation = useMutation( cmd => {
  //   return signOutUser(cmd);
  // }, {
  //   onSuccess(_, __, ___) {
  //     router.push('/login');
  //   },
  //   onError(error, _, __) {
  //     notification['error']({
  //       message: 'Login Error',
  //       description: `${error}`
  //     });
  //   },
  // });

  return (
    <strong onClick={ () => signOut() }>
      Sign Out
    </strong>
  )
}