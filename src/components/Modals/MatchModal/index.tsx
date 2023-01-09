import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import ItsAMatchImg from '../../../assets/images/itsAMatch.webp'
import BelaItsAMatch from '../../../assets/images/bela_its_a_match.webp'
import PhoneImg from '../../../assets/images/celularTeste.svg'
import { IconExclamationCircle } from '@tabler/icons'
import { IMatch } from '../../../pages'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

interface MatchModalProps {
  dataMatch: IMatch
}

const MatchModal = ({ dataMatch }: MatchModalProps) => {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  async function handleMatch() {
    try {
      const data = {
        ...dataMatch,
        user_id: user?.id,
        status: 'reservado',
      }
      const response = await axios.post('api/store', data)

      if (response.data.message) {
        toast.success(response.data.message)
        router.push('/orders/matches')
      }

      if (response.data.Error) {
        toast.error(response.data.Error)
      }
    } catch (err) {
      toast.error(
        'Ocorreu algum erro na realização do match, tente mais tarde.'
      )
    }
  }

  return (
    <>
      <input type="checkbox" id={'match-modal'} className="modal-toggle" />
      <label htmlFor={'match-modal'} className="modal cursor-pointer">
        <label className="modal-box relative flex flex-col gap-3" htmlFor="">
          <label
            htmlFor={'match-modal'}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <FontAwesomeIcon icon={faX} className="h-5 w-5 text-[#CCCCCC]" />
          </label>
          <div className="flex justify-center w-full">
            <Image src={ItsAMatchImg} width={325} height={72} />
          </div>
          <div className="flex justify-center w-full gap-5">
            <div className="rounded-full w-36 h-36 bg-[#EBEBEB] relative overflow-hidden">
              <Image
                src={BelaItsAMatch}
                quality={100}
                layout="responsive"
                alt="Imagem personagem Belatriz"
              />
            </div>
            <div className="flex flex-col justify-center items-center rounded-full w-36 h-36 bg-[#EBEBEB] relative overflow-hidden">
              <Image src={PhoneImg} layout="fixed" width={60} height={70} />

              <span className="text-xs text-black text-center px-3">
                iPhone 12 PRO MAX Azul-Sierra 256Gb
              </span>
            </div>
          </div>
          <div className="alert p-2 bg-[#EBEBEB] shadow-lg py-0">
            <div>
              <IconExclamationCircle
                size={120}
                className="text-[#00A8F3]"
                stroke={2}
                strokeLinejoin="miter"
              />
              <span className="text-xs text-[#00A8F3]">
                Após confirmar a reserva você terá 30min para avaliar a
                estratégia e seguir com o match ou não. Confirmando o interesse,
                o pedido será reservado por 3h até que nos envie os comprovantes
                do pedido realizado para efetivar a venda. Se esse prazo
                ultrapassar e a reserva expirar, sua conta será bloqueada de
                realizar matches por 7 dias.
              </span>
            </div>
          </div>
          <span className="flex justify-center text-center text-xs text-black">
            Ao continuar você concorda com os termos de uso e aceita os termos
            de venda
          </span>
          <button className="btn btn-primary" onClick={handleMatch}>
            Confirmar match
          </button>
          <label
            className="btn btn-outline w-full hover:bg-transparent hover:text-primary"
            htmlFor={'match-modal'}
          >
            cancelar
          </label>
        </label>
      </label>
    </>
  )
}

export default MatchModal
