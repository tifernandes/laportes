import axios from "axios";
import styles from '../styles/Cardapio.module.css'
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, LoadingOutlined } from '@ant-design/icons';
import Carrinho from "../components/Carrinho";
import { useEffect, useState, useContext } from 'react';
import { Select,Badge, Drawer, Spin } from 'antd';
import jump from 'jump.js'
import Head from 'next/head'
import AuthContext from '../context/authContext';

const { Option } = Select;

const Cardapio = ({ payload }) => {

    const [visible, setVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [categoriaFixed, setCategoriaFixed] = useState();
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        var carrinho = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];
        setCart(carrinho)

        async function getProdutos(){
            const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.vercel.app';
            const cardapioApi = await axios.get(`${endPoint}/api/cardapioAPI`);
            var categoria = [];
            var produtos = [];

            cardapioApi.data[0].map((ct, x) => {
                ct.values.map((prd, x) => {
                    produtos.push(prd);
                })
                categoria.push(ct)
            })

            setCategorias(categoria);
            setProdutos(produtos);

            setLoading(false) 
        }

        getProdutos();
    }, [])

    const carrinhoShow = () => {
        if(!visible){
            var filterCart = produtos.filter(function(e) {
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

    const handleSelect = (value) => {
        jump(`#${value}`, {
            duration: 500,
            offset: -145
        })
    }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        var scrolled;
        if(window.screen.width <= 1023){
            scrolled = currentScrollPos > 90;
        }else{
            scrolled = currentScrollPos >= 200;
        }
        scrolled ? setCategoriaFixed(true) : setCategoriaFixed(false)
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
    }, []);

    const CategoriaCmp = () => {
        return (
            <Select onChange={handleSelect} defaultValue="Selecione um tipo de produto..." style={{ width: '100%' }}>
                {categorias.map((categoria, x) => {
                    return (
                        <Option key={x} value={categoria.key}>{categoria.key}</Option>
                    )
                })}
            </Select>
        )
    }

    const LoadingCmp = () => {
        return (
            <div style={{display: 'flex', height: '65vh', justifyContent: 'center', alignItems: 'center'}}>
                <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 35, color: '#c07e20' }} spin />} />
            </div>
        )
    }

    return ( 
        <>
        <Head>
            <title>Laportes Restaurantes - Cardápio</title>
            <link rel="icon" href="/favicon.ico" /> 
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </Head>
        <Drawer title="" placement="right" contentWrapperStyle={{ maxWidth: '550px', width: '80%' }} onClose={carrinhoShow} visible={visible}>
            <Carrinho carrinho={cartItems} />
        </Drawer>
        {categoriaFixed ?
            <div className={styles.categoriaContainerFixed}>
                <div className={styles.categoriaFixed}>
                    <CategoriaCmp /> 
                </div>
            </div>
        : 
            <></>
        }
        <div className={styles.navbar}></div>
        <div onClick={carrinhoShow} className={styles.carrinho}>
            <Badge className={styles.carrinhoIcon} count={cart ? cart.length : 0}>
                <ShoppingCartOutlined />
            </Badge>
        </div>
        <div className={styles.container}>
            {!categoriaFixed ?
                <div className="pl-4 pr-4">
                <CategoriaCmp /> 
                </div>
            :
                <></>
            }
            <div className={styles.produtos}>
                {loading ? 
                    <LoadingCmp />
                :
                <>
                    {categorias.map((categoria, x) => {
                        return (
                            <div key={x} id={categoria.key} className={styles.categoria}>
                                <h1 className={styles.categoriaTitle}><span>{categoria.key}</span></h1>
                                {categoria.values.map((item, i) => {
                                    return (
                                        <div key={i} className={styles.produto}>
                                            <div className={styles.info}>
                                                <h1 className="text-xl">{item.nome}</h1>
                                                <p className="text-md">{item.descricao}</p>
                                                <h2>R$ {item.valor}</h2>
                                            </div>
                                            <div className={styles.actions}>
                                                {cart.findIndex(x => x.id == item.id) > -1 ? 
                                                    <h2 onClick={() => handleCarrinho((item.id).toString())} className={styles.buttonCartremove}><MinusOutlined  /></h2>
                                                    :
                                                    <h2 onClick={() => handleCarrinho((item.id).toString())} className={styles.buttonCartadd}><PlusOutlined  /></h2>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </>
                }
            </div>
        </div>
        </>
    );
}
 
export default Cardapio;

// export const getServerSideProps = async () => {
//     const endPoint = process.env.WEBSITE || 'https://laportes.vercel.app';
//     const res = await axios.get(`${endPoint}/api/cardapioAPI`);

//     return { 
//         props: { 
//             payload: res.data 
//         }
//     }
// }