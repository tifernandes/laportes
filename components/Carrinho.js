import { useState, useEffect } from 'react';
import styles from '../styles/Carrinho.module.css'
import { Form, Input, Select, Collapse } from 'antd';
import InputMask from 'react-input-mask';
import { MinusOutlined, PlusOutlined, LoadingOutlined, WhatsAppOutlined, CaretRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import axios from "axios";

const { Option } = Select;
const { Panel } = Collapse;

const Carrinho = (props) => {

    const [visibleConcluir, setVisibleConcluir] = useState({display: 'none'});
    const [resumoPedido, setResumoPedido] = useState([{pedido: []}]);
    const [visibleRealizado, setVisibleRealizado] = useState({display: 'none'});
    const [visibleCarrinho, setvisibleCarrinho] = useState({display: 'flex'});
    const [totalCarrinho, setTotalCarrinho] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [qtItemsCarrinho, setQtItemsCarrinho] = useState([]);
    const [reloadApis, setreloadApis] = useState(false);

    useEffect(() => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];
        var pedidoFeito = JSON.parse(localStorage.getItem('didOrder'));
        
        const pedidoApi = async () => {
            const resPedidosApi = await axios.get(`/api/pedidosAPI?_id=${pedidoFeito._id}`);
            console.log(resPedidosApi);

            setResumoPedido(resPedidosApi.data);

            setvisibleCarrinho({display: 'none'})
            setVisibleConcluir({display: 'none'})
            setVisibleRealizado({display: 'flex'})
        }

        if(pedidoFeito){
            pedidoApi();
        }

        setQtItemsCarrinho(carrinhoStorage);
        setCarrinho(props.carrinho);
        calcTotal();
    }, [props.carrinho])

    const calcTotal = () => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];

        var total = 0;
        props.carrinho.map((item, i) => {
            const qtItem = carrinhoStorage.find(x => x.id === item._id).qt;
            total += (qtItem*item.valor)
        })

        setTotalCarrinho(total);
    }

    const fazerPedidoShow = (tela) => {
        if(tela == 'Carrinho'){
            setvisibleCarrinho({display: 'flex'})
            setVisibleConcluir({display: 'none'})
            setVisibleRealizado({display: 'none'})
        }else if(tela == 'Concluir'){
            setvisibleCarrinho({display: 'none'})
            setVisibleConcluir({display: 'flex'})
            setVisibleRealizado({display: 'none'})
        }
    }

    const finalizarPedido = async values => {

        carrinho.map((item, i) => {
            const findItem = qtItemsCarrinho.find(x => x.id === item._id).qt;
            item.qt = findItem;
        })

        setResumoPedido([{values, pedido: carrinho}])

const pedidoWhats = 
`*Novo pedido solicitado:*
---------------------------------------

${carrinho.map((cr, x) => `*${cr.qt}x ${cr.nome}* \n`).join('')}
${values.obs ? `_Obs: ${values.obs}_` : ``}
        
*Total:* R$ ${totalCarrinho}
        
---------------------------------------
        
*Pedido para ${(values.entrega).toLowerCase()}*

*${values.nomeCompleto}*
${values.celular}

_Pedido gerado pelo Laportes.com.br às ${moment().format('LT')}_
`;
        
        const valueLinkWAPP = encodeURI(pedidoWhats).replace('%20','+');
        const url = 'https://web.whatsapp.com/send?phone=5511956104607&text='+valueLinkWAPP
        localStorage.setItem('zapolaMSG', JSON.stringify(url));
        window.open(url, '_ blank');

        values.data = moment().format();
        values.pedido = carrinho;
        const resPedidosApi = await axios.post(`/api/pedidosAPI`, values);

        if(resPedidosApi.data.message == 'Pedido enviado'){
            localStorage.setItem('didOrder', JSON.stringify({_id: resPedidosApi.data._id}));

            setvisibleCarrinho({display: 'none'})
            setVisibleConcluir({display: 'none'})
            setVisibleRealizado({display: 'flex'})
        }else{
            alert('Problema ao cadastrar o pedido.')
        }

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

    const handleEnviarZap = () => {
        const url = JSON.parse(localStorage.getItem('zapolaMSG')) || [];
        window.open(url, '_ blank');
        console.log(url);
    }

    return ( 
        <>
            <div style={visibleCarrinho} className={styles.carrinho}>
                <div className="flex flex-col h-full justify-between">
                    <h3 className="text-6xl text-center">Carrinho</h3>
                    <div className={styles.produtos}>
                        {carrinho.map((item, i) => {
                            return (
                                    <div key={i} className={styles.produto}>
                                        <div className="flex gap-2 items-center">
                                            <PlusOutlined onClick={() => handleQT('plus', item._id)} className="cursor-pointer" />
                                            {qtItemsCarrinho.find(x => x.id === item._id).qt}x
                                            <MinusOutlined onClick={() => handleQT('minus', item._id)} className="cursor-pointer" />
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
                        <button onClick={() => fazerPedidoShow('Concluir')}>Fazer Pedido</button>
                    </div>
                </div>
            </div>
            <div style={visibleConcluir} className={styles.fazerPedido}>
                <Form
                    name="basic"
                    id="dataForm"
                    initialValues={{ remember: true }}
                    onFinish={finalizarPedido}
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
                            valuePropName="option"
                            initialValue="Retirada no local"
                        >
                            <Select defaultValue="retirada no local">
                                <Option value="retirada no local">Retirada no local</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Observação:"
                            name="obs"
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
                        <p className="mt-5 cursor-pointer text-center" onClick={() => fazerPedidoShow('Carrinho')}>Voltar</p>
                    </div>
                </Form>
            </div>
            <div style={visibleRealizado} className={styles.fazerPedido}>
                <div className="flex flex-col h-full">
                    <h3 className="text-6xl text-center">Pedido Realizado</h3>
                    <div className={styles.pedidoConfirmado}>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            className="site-collapse-custom-collapse w-full"
                        >
                            <Panel header="Ver resumo do pedido" key="1" className="site-collapse-custom-panel">
                                <p>Itens</p>
                                {resumoPedido[0].pedido.map((item, x) => {
                                    return (
                                        <div key={x} className={styles.resumoPedido}>
                                            <p>{item.qt}x</p>
                                            <p>{item.nome}</p>
                                            <p>R${item.valor}</p>
                                        </div>
                                    )
                                })}
                                <div className={styles.resumoPedido}>
                                    <p>Total</p>
                                    <p>R${totalCarrinho}</p>
                                </div>
                            </Panel>
                        </Collapse>
                        <p>Teve problemas para enviar seu pedido para o WhatsApp?</p>
                        <div onClick={handleEnviarZap} className={styles.iniciarConversa}>
                            <WhatsAppOutlined />
                            <p>Iniciar Conversa</p>
                        </div>
                    </div>
                    </div>
            </div>
        </>
     );
}
 
export default Carrinho;