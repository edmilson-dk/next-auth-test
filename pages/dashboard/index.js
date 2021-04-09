import { signOut, useSession } from 'next-auth/client';
import { ButtonSignIn, SubTitle, Title } from '../../styles';

function DashBoard() {
  const [ session, loading ] = useSession();

  return (
    <>
      <Title>DashBoard is here!</Title>
      {
        session && <>
          <SubTitle>Not signed in {session.user.email}</SubTitle>
          <ButtonSignIn onClick={() => signOut()}>Sign out</ButtonSignIn>
        </>
      }
    </>
  )
}

export default DashBoard;