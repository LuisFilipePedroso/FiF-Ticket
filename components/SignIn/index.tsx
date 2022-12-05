import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img src="https://frontin.floripa.br/assets/img/logo.svg" alt="fif logo" className="w-48 h-48" />

      <button className="mt-10 bg-neutral-800 p-3 w-72 rounded-full" onClick={() => signIn('twitter')}>
        <span className="font-medium text-lg text-white tracking-normal">Entrar com o Twitter</span>
      </button>
    </div>
  )
}