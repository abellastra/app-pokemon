import styled from 'styled-components';
import React from 'react';

type props = {
    children:  React.ReactNode;
    estado: boolean;
    cambiarEstado:  React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({children, estado, cambiarEstado}: props) => {
    return(
        <>
            {estado &&
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>

                    </EncabezadoModal>

                    <BotonCerrar onClick={() => cambiarEstado(!estado)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </BotonCerrar>

                    {children}
                </ContenedorModal>

            </Overlay>
            }
        </>
    )
}

export default Modal;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContenedorModal = styled.div`
    width: 300px;
    min-heigth: 100px;
    background: rgba(255, 255, 255, 0.1); /* blanco pero súper transparente */
    backdrop-filter: blur(10px); /* efecto esmerilado */
    position:relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
`;
const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justyfy-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E8E8E8;

`;
const BotonCerrar = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    pointer-events: none;
  }
`;