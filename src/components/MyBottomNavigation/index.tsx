import {
  faBell,
  faHome,
  faNewspaper,
  faTags,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MyBottomNavigation = () => {
  const router = useRouter()
  const [pos, setPos] = useState('')
  const [move, setMove] = useState('-150%')
  const [color, setColor] = useState('primary')
  const positions = [10, 30, 50, 70, 90]
  const colors = ['primary', 'primary', 'primary', 'primary', 'primary']

  const handleSlide = (where: number) => {
    setMove(positions[where] + '%')
    setColor(colors[where])
    setPos(positions[where].toString())
  }
  useEffect(() => {
    if (router.asPath === '/tutorial') {
      handleSlide(0)
      return
    }

    if (router.asPath === '/orders') {
      handleSlide(1)
      return
    }

    if (router.asPath === '/') {
      handleSlide(2)
      return
    }

    if (
      router.asPath === '/cart' ||
      router.asPath == '/shipping' ||
      router.asPath == '/shipping/payment/pix' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit' ||
      router.asPath == '/shipping/payment/credit-checkout' ||
      router.asPath == '/shipping/payment/match-installments' ||
      router.asPath == '/shipping/payment/pix-checkout'
    ) {
      handleSlide(3)
      return
    }

    if (router.asPath === '/myshopping') {
      handleSlide(4)
      return
    } else {
      handleSlide(2)
    }
  }, [router.asPath])

  return (
    <div className="flex z-50 justify-around text-primary-content items-center fixed bottom-0 w-full h-12 p-0 bg-primary">
      <div
        className="flex justify-center items-center absolute w-[151px] h-[100px] -mt-[14px] transition-all duration-300 ease-in-out bg-[url('../../src/assets/images/Vector1.png')] bg-no-repeat"
        style={{ transform: 'translateX(-50%)', left: `${move}` }}
      >
        <span className="block rounded-[50%] h-[56px] w-[56px] -mt-[15px] transition-all ease-in-out duration-500 bg-gradient-to-r to-[#62F9C3] from-[#00A3FF]" />
      </div>
      <Link href="/" passHref>
        <div
          onClick={() => handleSlide(0)}
          className={
            'w-auto cursor-pointer flex flex-col items-center z-50 ease-in-out  transition-all duration-300 ' +
            (pos === '10' ? '-mt-6 scale-125' : 'mt-0 scale-100')
          }
        >
          <FontAwesomeIcon icon={faNewspaper} className="h-5 w-5" />
        </div>
      </Link>

      <Link href="/orders" passHref>
        <div
          onClick={() => handleSlide(1)}
          className={
            'w-auto  cursor-pointer z-50  ease-in-out transition-all duration-300 ' +
            (pos === '30' ? '-mt-5 scale-125' : 'mt-0 scale-100')
          }
        >
          <FontAwesomeIcon icon={faTags} className="h-5 w-5" />
        </div>
      </Link>
      <Link href="/" passHref>
        <div
          onClick={() => handleSlide(2)}
          className={
            'w-auto cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '50' ? '-mt-7 scale-125' : 'mt-0 scale-100')
          }
        >
          <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
        </div>
      </Link>
      <Link href="/cart" passHref>
        <div
          onClick={() => handleSlide(3)}
          className={
            'w-auto  cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '70' ? '-mt-7 scale-125' : 'mt-0 scale-100')
          }
        >
          <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
        </div>
      </Link>
      <Link href="/myshopping" passHref>
        <div
          onClick={() => handleSlide(4)}
          className={
            'w-auto cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '90' ? '-mt-7 scale-125' : 'mt-0 scale-100')
          }
        >
          <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
        </div>
      </Link>
    </div>
  )
}
export default MyBottomNavigation
