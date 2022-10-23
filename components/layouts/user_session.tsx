import { useSession } from 'next-auth/react';

export default function UserSession() {
  const { data: session, status } = useSession();
  // console.log(session);

  if (status === "authenticated") {
    return <strong>{session?.user?.email}</strong>
  }

  return <a href="/login">Sign in</a>
}