import Container from '../../../components/Container'
import React from 'react'
import { Input } from '../../../components/InputElement'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function New() {
  return (
    <Container bgColor="bg-[#F9F9F9]" title="Nova conta bancária">
      <div className="mt-10">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="CNPJ"
            label="Banco"
            placeholder="Selecione um banco"
          />
          <select className="select min-h-0 p-0 bg-transparent w-full">
            <option disabled selected>
              Conta corrente
            </option>
            <option>English</option>
            <option>Japanese</option>
            <option>Italian</option>
          </select>
          <Input
            type="text"
            name="CNPJ"
            label="Número da conta"
            placeholder="XXXXX"
          />
          <Input
            type="text"
            name="CNPJ"
            label="Digito (conta)"
            placeholder="X"
          />
          <Input
            type="text"
            name="CNPJ"
            label="Agência"
            placeholder="XXXXXXX"
          />
          <Input
            type="text"
            name="CNPJ"
            label="Dígito (Agência)"
            placeholder="X"
          />
        </div>
        <div className="flex flex-col mt-14">
          <h1 className="text-xl text-black/50 font-semibold">
            Cadastro do PIX
          </h1>
          <select className="select min-h-0 p-0 bg-transparent w-full">
            <option disabled selected>
              Conta corrente
            </option>
            <option>English</option>
            <option>Japanese</option>
            <option>Italian</option>
          </select>
          <Input
            type="text"
            name="CNPJ"
            label="Chave PIX"
            placeholder="Aleatória, E-mail, Documento ou Celular"
          />
        </div>
        <button className="btn btn-primary gap-1 w-full mt-10">
          <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
          Cadastrar
        </button>
      </div>
    </Container>
  )
}

export default New
