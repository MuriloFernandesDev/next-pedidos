import Image from 'next/image'
import LogoImg from '../../assets/images/LogoWhite.webp'

const LoadingScreen = () => {
  return (
    <div className="fixed w-screen h-screen bg-primary flex justify-center items-center z-[99999]">
      <div className="animate-bounce duration-[3000ms] p-20">
        <Image src={LogoImg}></Image>
      </div>
    </div>
  )
}

export default LoadingScreen
