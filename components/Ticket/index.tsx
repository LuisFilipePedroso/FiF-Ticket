import { signOut } from "next-auth/react";

type Props = {
  user: any;
}

export default function Ticket({ user }: Props) {

  const image = user.image.replace("_normal", "");
  const username = user.username;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img className="rounded-lg" src={`${process.env.HOST}/api/og?image=${image}&username=${username}`} />

      <button onClick={() => signOut()} className="mt-2 bg-transparent p-2 w-64 rounded-lg text-gray-900 font-normal text-lg">Logout</button>
    </div>
  )
}