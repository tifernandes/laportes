import { Drawer } from 'antd';
import { useState, useEffect } from 'react';
import styles from '../styles/Carrinho.module.css'
import { Form, Input, Select } from 'antd';
import InputMask from 'react-input-mask';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const Carrinho = (props) => {

    const [visibleConcluir, setVisibleConcluir] = useState({display: 'none'});
    const [visibleCarrinho, setvisibleCarrinho] = useState({display: 'flex'});
    const [totalCarrinho, setTotalCarrinho] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [qtItemsCarrinho, setQtItemsCarrinho] = useState([]);

    useEffect(() => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        setQtItemsCarrinho(carrinhoStorage);
        setCarrinho(props.carrinho);
        calcTotal();

    }, [props.visible])

    const calcTotal = () => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        var total = 0;
        props.carrinho.map((item, i) => {
            const qtItem = carrinhoStorage.find(x => x.id === item.id).qt;
            total += (qtItem*item.valor)
        })

        setTotalCarrinho(total);
    }

    const fazerPedidoShow = () => {
        visibleConcluir.display == 'none' ? setVisibleConcluir({display: 'flex'}) : setVisibleConcluir({display: 'none'})
        visibleCarrinho.display == 'none' ? setvisibleCarrinho({display: 'flex'}) : setvisibleCarrinho({display: 'none'})
    }

    const finalizarPedido = () => {
        console.log('finished');
    }

    const handleQT = async (type, idItem) => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        const produto = carrinhoStorage.findIndex(obj => obj.id === idItem);

        if(type == 'plus' && carrinhoStorage[produto].qt < 10){
            carrinhoStorage[produto].qt += 1;
        }else if(type == 'minus' && carrinhoStorage[produto].qt > 1){
            carrinhoStorage[produto].qt -= 1;
        }

        localStorage.setItem('prdcrtLaportes', JSON.stringify(carrinhoStorage));
        setQtItemsCarrinho(carrinhoStorage);

        calcTotal();

    }

    return ( 
        <Drawer title="" placement="right" contentWrapperStyle={{ maxWidth: '550px', width: '80%' }} onClose={props.carrinhoShow} visible={props.visible}>
            <div style={visibleCarrinho} className={styles.carrinho}>
                <div className="flex flex-col h-full justify-between">
                    <h3 className="text-6xl text-center">Carrinho</h3>
                    <div className={styles.produtos}>
                        {carrinho.map((item, i) => {
                            return (
                                    <div key={i} className={styles.produto}>
                                        <div className="flex gap-2 items-center">
                                            <PlusOutlined onClick={() => handleQT('plus', item.id)} className="cursor-pointer" />
                                            {qtItemsCarrinho.find(x => x.id === item.id).qt}x
                                            <MinusOutlined onClick={() => handleQT('minus', item.id)} className="cursor-pointer" />
                                        </div>
                                        <h2 className={styles.nomeProduto}>{item.nome}</h2>
                                        <h2>R$ {item.valor}</h2>
                                    </div>
                            )
                        })
                        }
                    </div>
                    <div>
                        <div className="flex justify-between text-xl">
                            <h1>Total</h1>
                            <h1>R$ {totalCarrinho}</h1>
                        </div>
                        <button onClick={fazerPedidoShow}>Fazer Pedido</button>
                    </div>
                </div>
            </div>
            <div style={visibleConcluir} className={styles.fazerPedido}>
                <Form
                    name="basic"
                    id="dataForm"
                    initialValues={{ remember: true }}
                    onFinish={() => finalizarPedido()}
                    requiredMark={false}
                    // onFinishFailed={onFinishFailed}
                >
                    <h3 className="text-6xl text-center">Pedido</h3>
                    <div className={styles.pedidoForm}>
                        <Form.Item
                            label="Nome completo"
                            name="nomeCompleto"
                            rules={[
                                { required: true, min: 5, message: 'Favor informar seu nome completo.' },
                                { pattern: new RegExp(/^[a-zA-Z\s]+$/i), message: 'Digite apenas letras.' }
                            ]}
                            // initialValue={data.name ? data.name : ''}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                { required: true, message: 'Favor informar seu e-mail.' },
                                {type: 'email', message: 'E-mail inválido.'}
                            ]}
                            // initialValue={data.email ? data.email : ''}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Celular / WhatsApp"
                            name="celular"
                            rules={[
                                { required: true, min: 15, message: 'Favor informar seu celular.' }
                            ]}
                            // initialValue={data.phone ? data.phone : ''}
                        >
                            <InputMask maskChar={null} mask="(99) 99999-9999">
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                        </Form.Item>

                        <Form.Item
                            label="Escolha uma opção:"
                            name="entrega"
                            // rules={[
                            //     { required: true, min: 15, message: 'Favor informar tipo de entrega.' }
                            // ]}
                            // initialValue={data.phone ? data.phone : ''}
                        >

                            <Select defaultValue="Retirada no local" disabled>
                                <Option value="retirada no local">Retirada no local</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Observação:"
                            name="obs"
                            // rules={[
                            //     { required: true, min: 15, message: 'Favor informar tipo de entrega.' }
                            // ]}
                            // initialValue={data.phone ? data.phone : ''}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                    
                    <div>
                        <div className="flex justify-between text-xl mt-5">
                            <h1>Total</h1>
                            <h1>R$ {totalCarrinho}</h1>
                        </div>
                        <Form.Item>
                            <button>Finalizar Pedido</button>
                        </Form.Item>
                        <p className="mt-5 cursor-pointer text-center" onClick={fazerPedidoShow}>Voltar</p>
                    </div>
                </Form>
            </div>
        </Drawer>
     );
}
 
export default Carrinho;