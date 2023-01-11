import Image from 'next/image'
import Link from 'next/link'
import BelaSad from '../../assets/images/bela_sad.webp'

interface NotFoundBellaProps {
  title: string
}

const NotFoundBella = ({ title }: NotFoundBellaProps) => {
  return (
    <div className="flex flex-col text-center md:text-left md:flex-row justify-center items-center gap-8 h-[500px]">
      <Image
        src={BelaSad}
        layout="fixed"
        width={220}
        height={250}
        quality={100}
        alt="Imagem personagem Belatriz"
      />
      <div>
        <h3 className="font-bold text-2xl">Sorria para a foto!</h3>
        <p className="opacity-50">{title}</p>
        <Link href={'/'}>
          <a className="btn btn-primary mt-6">Voltar para a página inicial</a>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundBella
