import {
  faBars,
  faCheckCircle,
  faExclamationCircle,
  faHeart,
  faX,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useState } from 'react'
import GosteiImg from '../../assets/images/gostei.svg'
import OuterImg from '../../assets/images/outer.svg'
import BlurImage from '../BlurImage'

interface CardMatchProps {
  next: () => void
}

const CardMatch = ({ next }: CardMatchProps) => {
  const [failMatch, setFailMatch] = useState(false)
  const [successMatch, setSuccessMatch] = useState(false)
  const handleOpenModalItsMatch = () => {
    return document
      .getElementById('modal-open-match')
      ?.classList.add('modal-open')
  }

  async function noMatch() {
    setFailMatch(false)
  }

  async function Math() {
    setSuccessMatch(false)
  }

  const wrapperFunction = async (condition?: string) => {
    if (condition === 'error') {
      setFailMatch(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      noMatch()
      await new Promise((resolve) => setTimeout(resolve, 200))
      next()
      return
    } else {
      setSuccessMatch(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      Math()
      await new Promise((resolve) => setTimeout(resolve, 200))
      next()

      setTimeout(() => {
        handleOpenModalItsMatch()
      }, 10000)
      return
    }
  }

  return (
    <>
      <div className="card flex flex-col  items-center text-info-content drop-shadow-xl rounded-lg">
        <span className="badge badge-success gap-1 bg-success/20 text-success">
          <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4" />
          Essa oferta expira em <span className="font-medium"> 3 dias</span>
        </span>
        <div className="relative flex mt-4 justify-center md:justify-end col-span-1">
          <BlurImage
            src={
              'https://www.buyphone.com.br/_next/image?url=https%3A%2F%2Fbuyphone-files.s3.us-east-2.amazonaws.com%2F2533%2F11-VERMELHO.webp&w=384&q=100'
            }
            layout="fixed"
            width={150}
            height={200}
          />

          <div
            className={
              'absolute -top-4 left-16 ' +
              (successMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={GosteiImg} />
          </div>
          <div
            className={
              'absolute -top-4 md:right-0 ' +
              (failMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={OuterImg} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 items-center">
          <h1 className="text-xl font-medium">iPhone 12 Apple Branco 64 Gb</h1>

          <span className="text-base font-medium text-black/50">
            Venda por <span className="text-xl text-black">R$ 6.200,00</span>
          </span>
          <span className="text-base font-medium text-black/50">
            Lucre até <span className="text-xl text-success">R$ 598,00</span>
          </span>

          <span className="badge badge-success bg-success/20 gap-1 text-success">
            <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
            Receba <span className="font-medium">R$3791,57</span> em 30 dias
          </span>

          <div className="flex gap-3">
            <button
              onClick={() => wrapperFunction('error')}
              className="btn btn-circle bg-transparent text-error hover:bg-error hover:text-white border-error rounded-full"
            >
              <FontAwesomeIcon icon={faX} className="w-6 h-6" />
            </button>

            <button className="btn btn-circle bg-transparent border-slate-600 rounded-full">
              <FontAwesomeIcon
                icon={faBars}
                className="w-4 h-4 text-slate-600"
              />
            </button>

            <button
              onClick={() => wrapperFunction('success')}
              className="btn btn-circle bg-transparent text-success hover:bg-success hover:text-white border-success rounded-full"
            >
              <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardMatch
