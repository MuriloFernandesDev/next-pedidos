import BlurImage from '../BlurImage'
import TutorialAula1Img from '../../assets/images/tutorial-aula1.webp'
import videoImg from '../../assets/images/video.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const CardTutorial = () => {
  return (
    <>
      <label className="card" htmlFor="my-modal-1">
        <div className="card-body p-3 items-center bg-primary font-semibold text-sm text-white">
          <div className="w-full">
            <h1>Aula 1: </h1>
            <p>Meus dados</p>
          </div>
          <BlurImage
            src={TutorialAula1Img}
            width={100}
            height={100}
            className="object-contain"
            layout="fixed"
          />
        </div>
      </label>

      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <label
        htmlFor="my-modal-1"
        className="modal cursor-pointer modal-bottom sm:modal-middle"
      >
        <label className="modal-box flex flex-col gap-4 relative" htmlFor="">
          <div className="flex justify-between items-center">
            <h1>Aula 1 - início</h1>
            <label className="cursor-pointer" htmlFor="my-modal-1">
              <FontAwesomeIcon icon={faX} className="w-3 h-3" />
            </label>
          </div>

          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </span>
          <div className="w-full">
            <BlurImage
              src={videoImg}
              layout="responsive"
              className="object-contain"
            />
          </div>
        </label>
      </label>
    </>
  )
}

export default CardTutorial
