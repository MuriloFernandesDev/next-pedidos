import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../assets/images/LogoPurple.webp'
import BlurImage from '../components/BlurImage'
import PhonePng from '../assets/images/celular.webp'

export default function Index() {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-primary-content">
      <div className="h-[40vh] flex flex-col gap-3 justify-between items-center bg-primary-content p-3">
        <div className="w-[40%]">
          <BlurImage
            src={LogoImg}
            className="object-contain"
            layout="responsive"
          />
        </div>
        <div className="w-[50%]">
          <BlurImage src={PhonePng} layout="responsive" />,
        </div>
      </div>
      <div className="h-[60vh] flex items-end bg-primary-content bg-top bg-no-repeat bg-cover bg-[url('../../src/assets/images/Ellipse.webp')]">
        <div className="flex flex-col gap-3 p-4 text-primary-content">
          <h1 className="text-3xl">
            A oportunidade de aumentar o lucro de suas vendas
          </h1>
          <h2 className="text-base">
            Tenha acesso a preços imbatíveis de iPhones nacionais lacrados para
            revenda!
          </h2>
          <Link href={'/account/login'}>
            <button className="btn btn-primary border-transparent bg-primary-content text-primary">
              Entrar
            </button>
          </Link>
          <Link href={'/account/register/name'}>
            <button className="btn btn-primary bg-transparent text-primary-content border-primary-content">
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
