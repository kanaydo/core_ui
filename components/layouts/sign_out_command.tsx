import Link from "next/link";
import { useMutation } from '@tanstack/react-query';
import { signOutUser } from "../../fetchers/login";

export default function SignOutButton() {
  const mutation = useMutation( cmd => {
    return signOutUser(cmd);
  }, {
    onSuccess(data, _, __) {

    },
    onError(error, _, __) {

    },
  });
  return (
    <strong onClick={ () => mutation.mutate()}>
      Sign Out
    </strong>
  )
}