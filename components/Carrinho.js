import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Carrinho.module.css'
import { Form, Input, Select, Collapse, Spin } from 'antd';
import InputMask from 'react-input-mask';
import { MinusOutlined, PlusOutlined, LoadingOutlined, WhatsAppOutlined, CaretRightOutlined, CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import axios from "axios";
import AuthContext from '../context/authContext';

const { Option } = Select;
const { Panel } = Collapse;

const Carrinho = (props) => {

    const { setPedidoShow } = useContext(AuthContext);

    const [visibleConcluir, setVisibleConcluir] = useState({display: 'none'});
    const [resumoPedido, setResumoPedido] = useState([{pedido: []}]);
    const [visibleRealizado, setVisibleRealizado] = useState({display: 'none'});
    const [visibleCarrinho, setvisibleCarrinho] = useState({display: 'flex'});
    const [totalCarrinho, setTotalCarrinho] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [whatsappNumero, setWhatsappNumero] = useState('');
    const [qtItemsCarrinho, setQtItemsCarrinho] = useState([]);
    const [isMobile, setisMobile] = useState(false);
    const [loading, setLoading ] = useState(true);
    const [reloadApis, setreloadApis] = useState(false);

    useEffect(() => {
        var carrinhoStorage = JSON.parse(localStorage.getItem('prdcrtLaportes')) || [];
        var pedidoFeito = JSON.parse(localStorage.getItem('didOrder'));

        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            setisMobile(true)
        }
        
        const pedidoApi = async () => {
            const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.com.br';
            const resPedidosApi = await axios.get(`${endPoint}/api/pedidosAPI?_id=${pedidoFeito._id}`);

            setResumoPedido(resPedidosApi.data);

            if(resPedidosApi.data[0].localretirada == 'scs'){
                setWhatsappNumero('11997894836');
            }else if(resPedidosApi.data[0].localretirada == 'sta'){
                setWhatsappNumero('11930322022');
            }
            

            setvisibleCarrinho({display: 'none'})
            setVisibleConcluir({display: 'none'})
            setVisibleRealizado({display: 'flex'})

            setLoading(false)
        }

        if(pedidoFeito){
            pedidoApi();
        }else{
            setLoading(false);
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

        var numeroWhatsApp;

        if(values.localretirada == 'scs'){
            numeroWhatsApp = '11997894836'
            setWhatsappNumero(numeroWhatsApp);
        }else if(values.localretirada == 'sta'){
            numeroWhatsApp = '11930322022'
            setWhatsappNumero(numeroWhatsApp);
        }

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

        var zapUrl;
        if(isMobile){
            zapUrl = 'https://api.whatsapp.com/send?phone=55'+numeroWhatsApp+'&text='
        }else{
            zapUrl = 'https://web.whatsapp.com/send?phone=55'+numeroWhatsApp+'&text='
        }

        const url = zapUrl+valueLinkWAPP
        localStorage.setItem('zapolaMSG', JSON.stringify(valueLinkWAPP));
        window.open(url, '_ blank');

        values.data = moment().format();
        values.pedido = carrinho;
        
        const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.com.br';
        const resPedidosApi = await axios.post(`${endPoint}/api/pedidosAPI`, values);

        if(resPedidosApi.data.message == 'Pedido enviado'){
            localStorage.setItem('didOrder', JSON.stringify({_id: resPedidosApi.data._id}));

            //aviso pedido existente
            setPedidoShow(true);

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
        const valueLinkWAPP = JSON.parse(localStorage.getItem('zapolaMSG')) || [];

        var zapUrl;
        if(isMobile){
            zapUrl = 'https://api.whatsapp.com/send?phone=55'+whatsappNumero+'&text='
        }else{
            zapUrl = 'https://web.whatsapp.com/send?phone=55'+whatsappNumero+'&text='
        }

        const url = zapUrl+valueLinkWAPP

        window.open(url, '_ blank');
    }

    const handleConcluirPedido = () => {
        localStorage.removeItem('didOrder');
        props.setShowCarrinho(false);

        setvisibleCarrinho({display: 'flex'})
        setVisibleConcluir({display: 'none'})
        setVisibleRealizado({display: 'none'})
        setPedidoShow(false)
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
        {loading ? 
            <LoadingCmp />
        :
        <>
            <div style={visibleCarrinho} className={styles.carrinho}>
                <div className="flex flex-col h-full justify-between">
                    <h3 className="text-6xl text-center">Carrinho</h3>
                    {carrinho.length > 0 ? 
                        <> 
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
                    </>
                    : 
                    <div className={styles.carrinhoVazio}>
                        <div className={styles.circle}></div>
                        <ShoppingCartOutlined />
                        <p>Ops... Carrinho vazio</p>
                    </div> 
                    }
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
                            label="Local retirada:"
                            name="localretirada"
                            valuePropName="option"
                        >
                            <Select>
                                <Option value="scs">Unidade São Caetano do Sul - Rua Pernambuco, 400 - Centro</Option>
                                <Option value="sta">Unidade Santo André - Rua Vitória Régia, 1419 - Campestre</Option>
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
                        <div>
                            <p>Obrigado pelo pedido !</p>
                            <p><span className="text-gray-400 italic">Último pedido em {moment(resumoPedido[0].data).format('LLL')}</span></p>
                        </div>
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
                        <div className={styles.concluir} onClick={handleConcluirPedido}>
                            <CheckOutlined />
                            Concluir pedido
                        </div>
                    </div>
                    </div>
            </div>
        </>
        }
        </>
     );
}
 
export default Carrinho;