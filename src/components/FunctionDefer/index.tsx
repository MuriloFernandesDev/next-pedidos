import { faExclamationCircle, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BlurImage from '../BlurImage'
import JrImg from '../../assets/images/jrmodal.webp'

const FunctionDeferModal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label
        htmlFor="my-modal-4"
        className="modal cursor-pointer modal-bottom sm:modal-middle"
      >
        <label className="modal-box relative" htmlFor="">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-black">
              Funcionalidade em desenvolvimento:
            </h1>
            <label className="cursor-pointer" htmlFor="my-modal-4">
              <FontAwesomeIcon icon={faX} className="w-5 h-5" />
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4">
            <span className="text-black/50 mt-2">
              Estamos sempre buscando melhorias contínuas no processo, e com
              isso surgem algumas necessidades de melhorias.
            </span>
            <div className="w-[80%] md:w-[160%]">
              <BlurImage src={JrImg} layout="responsive" />
            </div>
          </div>
          <span className="text-error">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="w-4 h-4 pr-1"
            />
            Você será notificado assim que essa funcionalidade estiver pronta.
          </span>
        </label>
      </label>
    </>
  )
}

export default FunctionDeferModal
