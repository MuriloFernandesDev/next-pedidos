import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import LoginRegister from '../../components/Login-Register'
import { AuthContext } from '../../contexts/AuthContext'
import { isLogged } from '../../utils/isLogged'

type SignInFormData = {
  email: string
  password: string
}

export default function login() {
  const { signIn } = useContext(AuthContext)

  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('Campo e-mail é obrigatório')
      .email('Digite um e-mail válido'),
    password: yup
      .string()
      .required('Campo senha é obrigatório')
      .min(6, 'Mínimo de 6 dígitos'),
  })

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event?.preventDefault()
    await signIn(values)
  }

  return (
    <LoginRegister>
      <>
        <div className="text-2xl flex md:gap-1 flex-col md:flex-row text-center justify-center pt-4 text-default font-medium">
          <span>Faça login ou </span> <span>cadastre-se</span>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="form-control gap-2 w-full"
          >
            <Input
              {...register('email')}
              type="text"
              label="E-mail"
              error={errors.email}
            />

            <Input
              {...register('password')}
              type="password"
              label="Senha"
              error={errors.password}
            />
            <div className="flex justify-end w-full">
              <Link href={'/account/forgot-password'} passHref>
                <a className="text-xs  text-blue-600 link cursor-pointer">
                  Esqueceu sua senha?
                </a>
              </Link>
            </div>
            <div className="mt-4">
              {formState.isSubmitting ? (
                <button className="btn loading upper-case py-4 text-PrimaryText flex justify-center w-full btn-info shadow-md border-0">
                  Carregando
                </button>
              ) : (
                <button
                  className="btn upper-case py-4 text-PrimaryText flex justify-center w-full btn-info shadow-md border-0"
                  type="submit"
                >
                  Entrar
                </button>
              )}
            </div>
            <div className="text-default flex flex-col items-center gap-1 justify-center">
              Deseja criar uma conta?
              <Link href={'/account/register'} passHref>
                <a className="link text-blue-600 cursor-pointer">Cadastre-se</a>
              </Link>
            </div>
          </form>
        </div>
      </>
    </LoginRegister>
  )
}

export const getServerSideProps = isLogged(async (ctx) => {
  return {
    props: {},
  }
})
