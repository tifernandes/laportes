import axios from "axios";
import styles from '../styles/Cardapio.module.css'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Carrinho from "../components/Carrinho";
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import mockData from './api/cardapioAPI'

const Cardapio = ({ payload }) => {

    // const payload = [
    //     {
    //       id: 1,
    //       nome: 'Trança doce de mandioquinha',
    //       valor: 30,
    //       descricao: 'Supermacia e com recheio de creme de baunilha e casquinha de açúcar no topo',
    //       categoria: 'Pães'
    //     },
    //     {
    //       id: 2,
    //       nome: 'Cinnamon Roll',
    //       valor: 9,
    //       descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
    //       categoria: 'Pães'
    //     }
    // ]

    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        var prdcrtSt = localStorage.getItem('prdcrtLaportes');
        prdcrtSt = prdcrtSt ? prdcrtSt.split(',') : [];
        setCart(prdcrtSt)
    }, [])

    const carrinhoShow = () => {
        if(!visible){

            var filterCart = payload.filter(function(e) {
                return cart.indexOf((e.id).toString()) !== -1;
            });

            setCartItems(filterCart);
        }

        setVisible(!visible);
    };

    const handleCarrinho = (prdID) => {
        var prdcrtSt = localStorage.getItem('prdcrtLaportes');
        prdcrtSt = prdcrtSt ? prdcrtSt.split(',') : [];

        if(cart.includes(prdID)){
            prdcrtSt = cart.filter(item => item !== prdID);
        }else{
            prdcrtSt.push(prdID);
        }

        localStorage.setItem("prdcrtLaportes", prdcrtSt.toString())
        setCart(prdcrtSt)
    }

    return ( 
        <>
        <Carrinho visible={visible} carrinhoShow={carrinhoShow} carrinho={cartItems} />
        <div onClick={carrinhoShow} className={styles.carrinho}>
            <Badge className={styles.carrinhoIcon} count={cart ? cart.length : 0}>
                <ShoppingCartOutlined />
            </Badge>
        </div>
        <div className={styles.container}>
            <h1>Cardápio</h1>
            <div className={styles.produtos}>
                {/* <h1>{categoria}</h1> */}
                {payload.map((item, i) => {
                    return (
                        <div key={i} className={styles.produto}>
                            <div className={styles.info}>
                                <h1>{item.nome}</h1>
                                <p>{item.descricao}</p>
                                <h2>R$ {item.valor}</h2>
                            </div>
                            <div className={styles.actions}>
                                {cart.includes((item.id).toString()) ? 
                                    <Button className={styles.buttonRemove} onClick={() => handleCarrinho((item.id).toString())} type="primary">REMOVER</Button>
                                    :
                                    <Button className={styles.buttonAdd} onClick={() => handleCarrinho((item.id).toString())} type="primary">ADICIONAR</Button> 
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    );
}
 
export default Cardapio;

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/cardapioAPI');

    return { 
        props: { 
            payload: res.data 
        }
    }
}