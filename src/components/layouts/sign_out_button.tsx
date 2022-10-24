import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <strong onClick={ () => signOut() }>
      Sign Out
    </strong>
  )
}