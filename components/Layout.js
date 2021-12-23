import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';

const Layout = ({ children }) => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        var popupStorage = JSON.parse(localStorage.getItem('popUp')) || [];

        if(popupStorage.length == 0){
            setShowModal(true)
            localStorage.setItem('popUp', JSON.stringify(moment().format()));
        }else{
            if(moment().subtract(1, 'days').format() > moment(popupStorage).format()){
                setShowModal(true)
                localStorage.setItem('popUp', JSON.stringify(moment().format()));
            }
        }
        
    }, {})

    const ModalCmp = () => {
        return (
            <Modal title="Prezado Cliente" visible={showModal} footer={null} onCancel={() => setShowModal(false)}>
                <p>Estaremos fechados de 24/12 à 03/01</p>
                <br/>
                <p>A equipe Laportes deseja muita Luz e boas festas!</p>
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