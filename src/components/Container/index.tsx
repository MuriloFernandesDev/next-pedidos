import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import React, { ReactElement } from 'react'

interface Props {
  children: ReactElement
  title?: string
  message?: string
  bgColor?: string | null
  home?: boolean
}

const Container = ({
  children,
  title,
  message,
  bgColor = '#FFF',
  home,
}: Props) => {
  return (
    <div
      className={`max-w-md mx-auto md:max-w-5xl md:mx-auto w-full relative bg-primary md:bg-base-100  ${
        !home ? 'pt-10' : 'pt-7'
      }`}
    >
      <div
        className={`p-5 rounded-none w-full rounded-t-xl md:rounded-lg min-h-screen md:shadow-lg bg-[${bgColor}]`}
      >
        {!home && title && (
          <div className="w-full flex flex-row justify-between items-center">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-primary w-5 h-5 cursor-pointer"
              onClick={Router.back}
            />

            <h1 className="text-primary text-xl font-bold">{title}</h1>

            <div />
          </div>
        )}

        {!!home && title && (
          <div className="w-full flex flex-row justify-center items-center">
            <h1 className="text-primary text-xl font-bold">{title}</h1>

            <div />
          </div>
        )}

        {!!message && (
          <h1 className="text-primary text-sm text-start opacity-70 my-7">
            {message}
          </h1>
        )}
        {!!home && title && <div className="divider"></div>}
        <div className={Router.asPath !== '/' ? 'max-w-2xl mx-auto' : ''}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Container
