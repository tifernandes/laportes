import { Drawer } from 'antd';
import styles from '../styles/Carrinho.module.css'
import Link from 'next/link'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const MobileMenu = (props) => {
    return ( 
        <Drawer title="" placement="right" className={styles.container} onClose={props.mobileMenuShow} visible={props.visible}>
            <div className="flex flex-col items-center justify-center text-xl gap-14 mt-10">
                <h3 className="text-6xl">Menu</h3>
                <Link href="/">
                    <a onClick={props.mobileMenuShow}>Início</a>
                </Link>
                <Link href="/historia">
                    <a onClick={props.mobileMenuShow}>História</a>
                </Link>
                <Link href="/cardapio">
                    <a onClick={props.mobileMenuShow}>Cardápio</a>
                </Link>
                <Link href="/historia">
                    <a onClick={props.mobileMenuShow}>Contato</a>
                </Link>
                <div className="flex text-3xl gap-x-10">
                    <FacebookOutlined className="cursor-pointer" />
                    <InstagramOutlined className="cursor-pointer" />
                </div>
            </div>
        </Drawer>
     );
}
 
export default MobileMenu;