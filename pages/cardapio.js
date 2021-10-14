import axios from "axios";
import styles from '../styles/Cardapio.module.css'
import { ShoppingCartOutlined } from '@ant-design/icons';
import Carrinho from "../components/Carrinho";
import { useEffect, useState } from 'react';
import { Button, Select,Badge } from 'antd';

const { Option } = Select;

const Cardapio = ({ payload }) => {

    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        var carrinho = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        setCart(carrinho)
    }, [])

    const carrinhoShow = () => {
        if(!visible){

            var allProducts = [];

            payload[0].map((categoria, x) => {
                categoria.values.map((item, i) => {
                    allProducts.push(item)
                })
            });

            var filterCart = allProducts.filter(function(e) {
                return cart.findIndex(x => x.id == e.id) !== -1
            });

            setCartItems(filterCart);
        }

        setVisible(!visible);
    };

    const handleCarrinho = (prdID) => {
        var carrinho = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        //verifica se existe algo no carrinho
        if(carrinho.length > 0){
            const prd = carrinho.findIndex(x => x.id == prdID);
            //verifica se ja existe o item no carrinho
            if(prd > -1){
                carrinho.splice(prd, 1);
            }else{
                carrinho.push({"id": parseInt(prdID), "qt": 1});
            }
        }else{
            carrinho.push({"id": parseInt(prdID), "qt": 1});
        }
        
        localStorage.setItem('prdcrtLaportes', JSON.stringify(carrinho));
        setCart(carrinho)
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
            <div className="flex justify-between pl-10 pr-10">
                <h3 className="text-4xl">Cardápio</h3>
                <Select defaultValue="Selecione um tipo de produto..." style={{ width: 120 }}>
                    {payload[0].map((categoria, x) => {
                        return (
                            <Option key={x} value={categoria.key}>{categoria.key}</Option>
                        )
                    })}
                </Select>
            </div>
            <div className={styles.produtos}>
                {payload[0].map((categoria, x) => {
                    return (
                        <>
                            <h1>{categoria.key}</h1>
                            {categoria.values.map((item, i) => {
                                return (
                                    <div key={i} className={styles.produto}>
                                        <div className={styles.info}>
                                            <h1>{item.nome}</h1>
                                            <p>{item.descricao}</p>
                                            <h2>R$ {item.valor}</h2>
                                        </div>
                                        <div className={styles.actions}>
                                            {cart.findIndex(x => x.id == item.id) > -1 ? 
                                                <Button className={styles.buttonRemove} onClick={() => handleCarrinho((item.id).toString())} type="primary">REMOVER</Button>
                                                :
                                                <Button className={styles.buttonAdd} onClick={() => handleCarrinho((item.id).toString())} type="primary">ADICIONAR</Button> 
                                            }
                                        </div>
                                    </div>
                                )
                        })}
                        </>
                    )
                })}
            </div>
        </div>
        </>
    );
}
 
export default Cardapio;

export const getServerSideProps = async () => {
    const endPoint = process.env.WEBSITE || 'https://laportes.vercel.app';
    const res = await axios.get(`${endPoint}/api/cardapioAPI`);

    return { 
        props: { 
            payload: res.data 
        }
    }
}