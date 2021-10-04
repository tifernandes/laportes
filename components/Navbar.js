import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { MenuOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import MobileMenu from './MobileMenu';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const mobileMenuShow = () => {
        setVisible(!visible);
    };

    return(
        <>
            <MobileMenu visible={visible} mobileMenuShow={mobileMenuShow} />
            <div className={styles.navbar}>
                <div className={styles.content}>
                    {/* <div className={styles.warning}>
                        <h4>Seja bem vindo !</h4>
                    </div> */}
                    <div className="block lg:hidden">
                        <Image className={styles.logo} src="/logo.png" width={150} height={170} layout="fixed"/>
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <Image className={styles.logo} src="/logo.png" width={70} height={90} layout="fixed"/>
                        <h3 className="text-4xl text-white">Laportes</h3>
                    </div>
                    <div className="hidden lg:block" onClick={mobileMenuShow}>
                        <div className="border-gray-200 border-opacity-20 text-4xl border cursor-pointer">
                            <MenuOutlined className="p-2"/>
                        </div>
                    </div>
                    <div className={styles.desktop} >
                        <Link href="/">
                            <a>Início</a>
                        </Link>
                        <Link href="/historia">
                            <a>História</a>
                        </Link>
                        <Link href="/cardapio">
                            <a>Cardápio</a>
                        </Link>
                        <Link href="/historia">
                            <a>Contato</a>
                        </Link>
                    </div>
                    <div className="flex lg:hidden text-3xl gap-x-5">
                        <FacebookOutlined className="cursor-pointer" />
                        <InstagramOutlined className="cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className={styles.divisor}></div>
        </>
    )
}

export default Navbar;