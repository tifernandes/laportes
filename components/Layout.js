import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
import { Modal } from 'antd';
import { useState } from 'react';

const Layout = ({ children }) => {

    const [showModal, setShowModal] = useState(true);

    const ModalCmp = () => {
        return (
            <Modal title="Prezado Cliente" visible={showModal} footer={null} onCancel={() => setShowModal(false)}>
                <p>No dia do aniversário, o aniversariante ganha R$50 em sua comanda</p>
                <br/>
                <p>Regras:</p>
                <p>-Mínimo de seis pessoas na mesa</p>
                <p>-Apresentação de documento com foto</p>
                <p>OBS: Sem o documento o desconto não se aplica</p>
                <br/>
                <p>Agradecemos a preferência</p>
            </Modal>
        )
    }

    return(
        <>
            <ModalCmp />
            <Navbar />
                {children}
            <Footer />
        </>
    )
}

export default Layout;