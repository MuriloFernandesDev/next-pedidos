import Link from 'next/link'
import { ReactElement } from 'react'

interface CircleOptionProps {
  icon: ReactElement
  title: string
  link: string
}

const CircleOption = ({ icon, title, link = '/' }: CircleOptionProps) => {
  return (
    <Link href={link}>
      <div className=" flex flex-col items-center">
        <button className="btn w-16 h-16 bg-gradient-to-r to-[#62F9C3] from-[#00A3FF] rounded-full relative flex justify-center items-center">
          {/* <FontAwesomeIcon
            icon={icon}
            className="w-6 h-6 text-primary-content"
          /> */}
          {icon}
        </button>
        <h1 className="text-xs font-semibold text-primary-content mt-1">
          {title}
        </h1>
      </div>
    </Link>
  )
}

export default CircleOption
