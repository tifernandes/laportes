import axios from "axios";
import styles from '../styles/Cardapio.module.css'
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, LoadingOutlined, CarryOutOutlined } from '@ant-design/icons';
import Carrinho from "../components/Carrinho";
import { useEffect, useState, useContext } from 'react';
import { Select,Badge, Drawer, Spin } from 'antd';
import jump from 'jump.js'
import Head from 'next/head'
import AuthContext from '../context/authContext';
import { Alert } from 'antd';

const { Option } = Select;

const Cardapio = ({ payload }) => {

    const { setShowCarrinho, showCarrinho } = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [categoriaFixed, setCategoriaFixed] = useState();
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [pedidoRealizado, setPedidoRealizado] = useState(false);
    
    useEffect(() => {
        var carrinho = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];
        setCart(carrinho)

        var didOrder = JSON.parse(localStorage.getItem('didOrder')) || null;

        if(didOrder){
            setPedidoRealizado(true);
        }

        async function getProdutos(){
            const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.vercel.app';
            const cardapioApi = await axios.get(`${endPoint}/api/cardapioAPI`);

            var categoria = [];
            var produtos = [];

            cardapioApi.data[0].map((data, x) => {
                data.values.map((prd, x) => {
                    produtos.push(prd);
                })
                data.key.map((ct, y) => {
                    categoria.push(ct)
                })
            })

            let categoriasUnicas = [...new Set(categoria)];

            setCategorias(categoriasUnicas.sort());
            setProdutos(produtos);

            setLoading(false) 
        }

        getProdutos();
    }, [])

    const carrinhoShow = () => {
        if(!showCarrinho){

            var filterCart = produtos.filter(function(e) {
                return cart.findIndex(x => x.id == e._id) !== -1
            });

            setCartItems(filterCart);
        }

        setShowCarrinho(!showCarrinho);
    };

    const handleCarrinho = (prdID) => {
        var carrinho = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        if(!pedidoRealizado){
            //verifica se existe algo no carrinho
            if(carrinho.length > 0){
                const prd = carrinho.findIndex(x => x.id == prdID);
                //verifica se ja existe o item no carrinho
                if(prd > -1){
                    carrinho.splice(prd, 1);
                }else{
                    carrinho.push({"id": prdID, "qt": 1});
                }
            }else{
                carrinho.push({"id": prdID, "qt": 1});
            }

            localStorage.setItem('prdcrtLaportes', JSON.stringify(carrinho));
            setCart(carrinho)
        }else{
            alert('Não é possivel adicionar ou remover itens no carrinho com um pedido em aberto.')
        }
    }

    const handleSelect = (value) => {

        const node = document.getElementsByName(value)[0]

        jump(node, {
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
                        <Option key={x} value={categoria}>{categoria}</Option>
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
        </Head>
        <Drawer title="" placement="right" contentWrapperStyle={{ maxWidth: '550px', width: '80%' }} onClose={carrinhoShow} visible={showCarrinho}>
            <Carrinho carrinho={cartItems} setShowCarrinho={setShowCarrinho} />
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
            <>
                {loading ? 
                    <LoadingCmp />
                :
                <div className="animate__animated animate__fadeIn">
                    <div className="mt-5 pl-4 pr-4">
                        <Alert message="Atenção ! Os pedidos ficam prontos em no minímo 2 dias." type="warning" showIcon closable />
                    </div>
                    {categorias.map((categoria, x) => {
                        return (
                            <div key={x} name={categoria} className={styles.categoria}>
                                <h1 className={styles.categoriaTitle}><span>{categoria}</span></h1>
                                {produtos.map((prd, x) => {
                                    return prd.categoria.map((ct, y) => {
                                        if(ct.toLowerCase().includes(categoria.toLowerCase())){
                                            return (
                                                <div key={y} className={styles.produto}>
                                                    <div className={styles.info}>
                                                        <h1 className="text-xl">{prd.nome}</h1>
                                                        <p className="text-md">{prd.descricao}</p>
                                                        <h2>R$ {prd.valor}</h2>
                                                    </div>
                                                    <div className={styles.actions}>
                                                        {cart.findIndex(x => x.id == prd._id) > -1 ? 
                                                            <h2 onClick={() => handleCarrinho((prd._id).toString())} className={styles.buttonCartremove}><MinusOutlined  /></h2>
                                                            :
                                                            <h2 onClick={() => handleCarrinho((prd._id).toString())} className={styles.buttonCartadd}><PlusOutlined  /></h2>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                })}
                            </div>
                        )
                    })}
                </div>
                }
            </>
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