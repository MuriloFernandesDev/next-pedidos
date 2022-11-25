import Container from '../components/Container'
import TutorialAula1Img from '../assets/images/tutorial-aula1.webp'
import BlurImage from '../components/BlurImage'
import CardTutorial from '../components/CardTutorial'

function Tutorial() {
  return (
    <Container title="Tutorial">
      <div className="flex flex-col gap-5 mt-10 min-h-screen">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-xl font-medium">
            Dúvidas frequentes
          </div>
          <div className="collapse-content grid grid-cols-2 gap-5">duvidas</div>
        </div>
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
        >
          <div className="collapse-title text-xl font-medium">
            Vídeos tutoriais
          </div>
          <div className="collapse-content grid grid-cols-2 gap-5">
            <CardTutorial />
            <CardTutorial />
            <CardTutorial />
            <CardTutorial />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Tutorial
