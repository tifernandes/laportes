import { Drawer } from 'antd';
import { useState, useEffect } from 'react';
import styles from '../styles/Carrinho.module.css'
import { TagsOutlined } from '@ant-design/icons';

const Carrinho = (props) => {
    return ( 
        <Drawer title="" placement="right" className={styles.container} onClose={props.carrinhoShow} visible={props.visible}>
            <div className="mt-10 flex flex-col justify-center gap-5">
                <h3 className="text-6xl mb-10 text-center">Carrinho</h3>
                {props.carrinho.length > 0 ? (
                    props.carrinho.map((item, i) => {
                        return (
                            <div key={i} className={styles.produto}>
                                <h2 className={styles.nomeProduto}>{item.nome}</h2>
                                <h2>R$ {item.valor}</h2>
                            </div>
                        )
                    })) : 
                    <div className={styles.vazio}>
                        <TagsOutlined /> 
                        <h2>Carrinho vazio</h2>
                    </div>
                }
            </div>
        </Drawer>
     );
}
 
export default Carrinho;