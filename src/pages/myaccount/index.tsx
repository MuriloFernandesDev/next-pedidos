import Container from '../../components/Container'
import React, { useContext } from 'react'
import { Input } from '../../components/InputElement'
import CardAccountBank from '../../components/CardAccountBank'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { AuthContext } from '../../contexts/AuthContext'

export default function index() {
  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <Container bgColor="bg-[#FFF]" title="Minha conta">
      <React.Fragment>
        <div className="flex flex-col gap-4 mt-6 text-primary">
          <div className="flex flex-col mx-auto gap-4">
            <img
              className="mask mask-circle"
              src="https://placeimg.com/130/130/arch"
            />
            <button className="btn p-0 min-h-0 h-auto bg-transparent border-none link text-primary">
              Alterar imagem
            </button>
          </div>
          <div className="grid gap-6">
            <Input
              type="text"
              name="CNPJ"
              label="Nome completo"
              defaultValue={user?.name}
            />
            <Input
              type="text"
              name="CNPJ"
              label="CPF"
              defaultValue={user?.document}
            />
            <Input
              type="text"
              name="CNPJ"
              label="Nascimento"
              defaultValue={user?.birthday}
            />
            <Input type="text" name="CNPJ" label="Celular" />
            <Input
              type="text"
              name="CNPJ"
              label="E-mail"
              defaultValue={user?.email}
            />
            <Input
              type="text"
              name="CNPJ"
              label="CEP"
              placeholder="16012-125"
            />
            <Input type="text" name="CNPJ" label="Rua" placeholder="Rua azul" />
            <Input
              type="text"
              name="CNPJ"
              label="Bairro"
              placeholder="Centro"
            />
            <Input type="text" name="CNPJ" label="N??mero" placeholder="2000" />
          </div>
          <div className="mt-8">
            <h1 className="text-lg font-semibold">Contas cadastradas</h1>
            <div className="flex flex-col gap-3">
              <CardAccountBank />
              <CardAccountBank />
              <Link href={'/myaccount/banks/new'}>
                <button className="btn btn-primary gap-3 w-1/2">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  Cadastrar nova
                </button>
              </Link>
              <div className="mt-4">
                <p>Importante saber:</p>
                <span className="text-error">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
                  accumsan nulla enim rhoncus quisque ipsum in. Massa vitae
                  vulputate mauris sed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Container>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  return {
    props: {},
  }
}, '/myaccount')
