import { Drawer } from 'antd';
import styles from '../styles/Carrinho.module.css'
import Link from 'next/link'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const MobileMenu = (props) => {
    return ( 
        <Drawer title="" placement="right" className={styles.container} onClose={props.mobileMenuShow} visible={props.visible}>
            <div className="flex flex-col items-center justify-center text-xl gap-14">
                <h3 className="text-6xl">Menu</h3>
                <Link href="/">
                    <a onClick={props.mobileMenuShow}>Início</a>
                </Link>
                <a onClick={() => props.scrollSmooth('historia')}>História</a>
                <Link href="/cardapio">
                    <a onClick={props.mobileMenuShow}>Cardápio</a>
                </Link>
                <a onClick={() => props.scrollSmooth('unidades')}>Unidades</a>
                <a onClick={() => props.scrollSmooth('contato')}>Contato</a>
            </div>
        </Drawer>
     );
}
 
export default MobileMenu;