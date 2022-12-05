import Head from 'next/head';

import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import SignIn from '../components/SignIn';
import Ticket from '../components/Ticket';
import { authOptions } from './api/auth/[...nextauth]';

type Props = {
  session: any;
}

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>FiF Ticket</title>
        <meta name="description" content="FiF ticket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen bg-slate-100">
        {session && session?.user ? <Ticket user={session?.user} /> : <SignIn />}
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      props: {}
    }
  }

  return {
    props: {
      session: {
        ...session,
        user: {
          ...session.user,
          email: null
        }
      },
    },
  }
}
