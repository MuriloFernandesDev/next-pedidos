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
import { IMatch } from '../../pages'
import { moneyMask } from '../../utils/masks'
import BlurImage from '../BlurImage'
import MatchModal from '../Modals/MatchModal'

interface CardMatchProps {
  next: () => void
  data: any
}

const CardMatch = ({ next, data }: CardMatchProps) => {
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
          {data.translated_expires_at}
        </span>
        <div className="relative flex mt-4 justify-center items-center col-span-1">
          <BlurImage
            src={data.product.photo}
            alt={data.product.name}
            layout="fixed"
            width={150}
            height={200}
            priority
          />

          <div
            className={
              'absolute -top-4 right-0 mx-auto ' +
              (successMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={GosteiImg} width={200} layout="fixed" />
          </div>
          <div
            className={
              'absolute -top-4 right-0 ' +
              (failMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={OuterImg} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 items-center">
          <h1 className="text-xl font-medium">{data.product.name}</h1>

          <span className="text-base font-medium text-black/50">
            Venda por{' '}
            <span className="text-xl text-black">
              R$ {moneyMask(data.price.toString())}
            </span>
          </span>
          <span className="text-base font-medium text-black/50">
            Lucre até{' '}
            <span className="text-xl text-success">
              R$ {moneyMask((data.price - data.will_receive).toString())}
            </span>
          </span>

          <span className="badge badge-success bg-success/20 gap-1 text-success">
            <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
            Receba{' '}
            <span className="font-medium">
              R$ {moneyMask(data.will_receive.toString())}
            </span>{' '}
            em 30 dias
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

            <label
              className="btn btn-circle bg-transparent text-success hover:bg-success hover:text-white border-success rounded-full"
              htmlFor={data.order_id.toString()}
            >
              <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardMatch
