import Image from 'next/image'
import LogoImg from '../../assets/images/LogoWhite.webp'

const LoadingComponent = () => {
  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center bg-primary">
      <div className="animate-bounce duration-[3000ms] p-20">
        <Image src={LogoImg}></Image>
      </div>
    </div>
  )
}

export default LoadingComponent
