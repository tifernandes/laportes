import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react';
import { MenuOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import MobileMenu from './MobileMenu';
import jump from 'jump.js'
import { useRouter } from 'next/router'
import AuthContext from '../context/authContext';

const Navbar = () => {

    const { setShowCarrinho, pedidoShow, setPedidoShow } = useContext(AuthContext);

    const router = useRouter()
    const [visible, setVisible] = useState(false);
    const [menuFixed, setMenuFixed] = useState();
    const [lgpd, setLgpd] = useState(true);

    const mobileMenuShow = () => {
        setVisible(!visible);
    };

    const scrollSmooth = async (idDiv) => {

        if(router.pathname.includes('/cardapio')){
            await router.push('/')
        }

        if(visible){
            setVisible(false);
        }

        jump(`#${idDiv}`, {
            duration: 500,
            offset: -100
        })
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const scrolled = currentScrollPos >= 90;
        scrolled ? setMenuFixed(true) : setMenuFixed(false)
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        var lgpdCheck = localStorage.getItem('lgpd') || [];
        var checkPedido = localStorage.getItem('didOrder') || [];
        
        if(lgpdCheck == 'accepted'){
            setLgpd(false);
        }

        if(checkPedido.length > 0) setPedidoShow(true);

    }, []);

    const acceptLGPD = () => {
        localStorage.setItem('lgpd', 'accepted');
        setLgpd(false);
    }

    const ContentMenu = () => {
        return (
            <>
                <div className="block lg:hidden">
                    {!menuFixed ? 
                        <Image className={styles.logo} src="/logo.png" width={130} height={150} layout="fixed"/>
                    :
                        <div className="flex items-center gap-3">
                            <Image className={styles.logo} src="/logo.png" width={70} height={90} layout="fixed"/>
                            <h3 className="text-4xl text-white">Laportes</h3>
                        </div>
                    }
                </div>
                <div className="hidden lg:flex items-center gap-3">
                    <Image className={styles.logo} src="/logo.png" width={50} height={60} layout="fixed"/>
                    <h3 className="text-2xl text-white">Laportes</h3>
                </div>
                <div className="hidden lg:block" onClick={mobileMenuShow}>
                    <div className="border-gray-200 border-opacity-60 text-2xl border cursor-pointer">
                        <MenuOutlined className="p-2"/>
                    </div>
                </div>
                <div className={styles.desktop} >
                    <Link href="/">
                        <a>Início</a>
                    </Link>
                    <a onClick={() => scrollSmooth('historia')}>História</a>
                    <Link href="/cardapio">
                        <a>Cardápio</a>
                    </Link>
                    <a onClick={() => scrollSmooth('unidades')}>Unidades</a>
                    <a onClick={() => scrollSmooth('contato')}>Contato</a>
                </div>
                <div className="flex lg:hidden text-3xl gap-x-5">
                    <Link href="https://www.facebook.com/Laportes-Restaurante-554554051410795">
                        <a target="_blank"><FacebookOutlined className="cursor-pointer" /></a>
                    </Link>
                    <Link href="https://www.instagram.com/laportescompany/">
                        <a target="_blank"><InstagramOutlined className="cursor-pointer" /></a>
                    </Link>
                </div>
            </>
        )
    }


    return(
        <>
            <MobileMenu visible={visible} scrollSmooth={scrollSmooth} mobileMenuShow={mobileMenuShow} />
            {menuFixed ?
                <div className={styles.navbarFixed}>
                    <div className={styles.content}>
                        <ContentMenu />
                    </div>
                </div>
                : 
                <>
                    {pedidoShow ? 
                        <div className={styles.warning}>
                            <h4>Você possui um pedido em aberto. 
                                <span 
                                onClick={() => {
                                    setShowCarrinho(true)
                                    router.push('/cardapio')
                                }}
                                className="ml-4"
                                >
                                    VER PEDIDO
                                </span>
                            </h4>
                        </div>
                    : 
                        <></>
                    }
                    <div className={styles.navbar}>
                        <div className={styles.content}>
                            <ContentMenu />
                        </div>
                    </div>
                </>
            }
            <div className={styles.divisor}></div>
            <div className={styles.lgpd} style={{display: lgpd ? 'block' : 'none' }}>
                <div className={styles.lgpdContent}>
                    <p>O site está em conformidade com a LGPD e utiliza cookies para oferecer uma melhor experiência ao visitante. Ao navegar em nosso site, você concorda com a utilização de cookies.</p>
                    <button onClick={acceptLGPD}>Concordo</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;