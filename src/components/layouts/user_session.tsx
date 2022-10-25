import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserSession() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <strong>{session?.user?.email}</strong>
  }

  return <Link href="/login">Sign in</Link>
}