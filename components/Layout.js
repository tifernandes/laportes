import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link'

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
                <p>Para ver mais das nossas unidades e produtos, nos acompanhe no Instagram! </p>
                <br/>
                <Link href="https://www.instagram.com/laportescompany/">
                    <a target="_blank"><p>@laportescompany</p></a>
                </Link>       
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