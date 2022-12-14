import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'

export function isLogged<P>(fn: GetServerSideProps<any>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { '@BuyPhone:Token': token } = parseCookies(ctx)

    if (token) {
      const decodedToken = jwt_decode<any>(token) //decodifica o token

      //se existir um token e estiver expirado, mandar para o login
      if (Date.now() >= decodedToken.exp * 1000) {
        destroyCookie(ctx, '@BuyPhone:Token')
        return {
          redirect: {
            destination: '/account/login',
            permanent: false,
          },
        }
      }
      //se o token tiver válido mandar para a home
      else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
    return await fn(ctx)
  }
}
