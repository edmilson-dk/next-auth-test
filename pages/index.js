import { signIn, useSession } from 'next-auth/client';
import { ButtonSignIn, Title } from '../styles';

import DashBoard from './dashboard';

export default function Page() {
  const [ session, loading ] = useSession();
  
  return <>
    {!session && <>
      <Title>Not signed in</Title>
      <ButtonSignIn onClick={() => signIn()}>Sign in</ButtonSignIn>
    </>}
    {session && <>
      <DashBoard />
    </>}
  </>
}