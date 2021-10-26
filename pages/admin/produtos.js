import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Input, Modal, Spin, Space, Form, Collapse, Typography, DatePicker, notification, Select } from 'antd';
import { QuestionCircleOutlined, AlertOutlined, CaretRightOutlined, WarningOutlined, CheckCircleOutlined, CaretDownOutlined, CaretUpOutlined, ClockCircleOutlined, FlagOutlined, CloseOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import axios from "axios";
// import AuthContext from '../context/authContext';
// import api from '../api';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;

const Produtos = () => {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    // const [diaSelecionado, setDiaSelecionado] = useState(moment().format('L'))
    // const { user } = useContext(AuthContext)
    const [modalSinal, setmodalSinal] = useState();
    const [loading, setLoading] = useState(true);
    const [reloadApis, setreloadApis] = useState(false);

    useEffect(() => {
        async function getProdutos(){
            const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.vercel.app';
            const cardapioApi = await axios.get(`${endPoint}/api/cardapioAPI`);
            var categoria = [];
            var produtos = [];

            console.log(cardapioApi.data[0])

            cardapioApi.data[0].map((ct, x) => {
                ct.values.map((prd, x) => {
                    produtos.push(prd);
                })
                categoria.push(ct.key)
            })

            setCategorias(categoria);
            setProdutos(produtos);

            setLoading(false)  
        }

        getProdutos();
    }, [reloadApis])

    const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        render: h => {
            return <><ClockCircleOutlined style={{fontSize: '15px', transform: 'scale(.83)'}} /> {h}</>
        }
    },
    {
        title: 'Categoria',
        dataIndex: 'categoria',
        key: 'categoria',
        render: m => {
            return <><FlagOutlined style={{fontSize: '15px', transform: 'scale(.83)'}} /> {m}</>
        }
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor',
        render: d => {
            return (<><CaretUpOutlined style={{fontSize: '15px', transform: 'scale(.83)', color: '#52c41a' }}/> {d}</>)
        }
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        render: d => {
            return (<><CheckOutlined style={{fontSize: '22px', transform: 'scale(.83)', color: '#52c41a' }}/> {d}</>)
        }
    },
    {
        title: 'Imagem',
        dataIndex: 'imagem',
        key: 'imagem',
        // render: dia => moment(dia).format('L')
    }
    ];
    
    const addSinais = async values => {
        values.user_id = user.id;
        console.log('values ',values)
        const addSinalResponse = await api.post('/sinaisob/addsinais', values)

        if(addSinalResponse.data.includes("sucesso")){
            setreloadApis(!reloadApis)
            setmodalSinal(false)
            notification.open({
				message: 'Sucesso.',
				description: addSinalResponse.data,
				icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			});
        }else{
            notification.open({
				message: 'Erro ao adicionar sinal.',
				description: addSinalResponse.data,
				icon: <WarningOutlined style={{ color: '#faad14' }} />,
			});
        }

    };

    const filtroSinais = async value => {
        const sinaisApi = await api.get(`/sinaisob?filtro=${value}&usrid=${user.id}`)
        setSinais(sinaisApi.data[0]);
    }

    if(loading){
        return (
            <div style={{display: 'flex', height: '65vh', justifyContent: 'center', alignItems: 'center'}}>
                <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 35 }} spin />} />
            </div>
        )
    }

    return ( 
        <>
        <Modal
        title="Novo Sinal"
        visible={modalSinal}
        footer={[
        <Button className="ant-btn ant-btn-primary" form="sinalForm" key="submit" htmlType="submit">
            Adicionar
        </Button>
        ]}
        onCancel={() => setmodalSinal(false)}
        >
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <Panel header="Exemplo de uso" key="1" className="site-collapse-custom-panel">
                    <p>Para adicionar digite cada sinal em uma linha separando "Hora, Ativo, Direção" por uma vírgula:</p>
                    <div className="sinal_exemplo">
                        <Text code>01:30,AUD/USD,PUT</Text>
                        <Text code>13:45,EUR/USD,CALL</Text>
                        <Text code>22:15,GBP/JPY-OTC,CALL</Text>
                    </div>
                    <p>* Certifique-se de que não existam espaços em branco e nomes de ativos incorretos.</p>
                </Panel>
            </Collapse>
            <Form id="sinalForm" onFinish={addSinais} className="formAddSinal">
                <Form.Item name="sinais_data" className="addSinal" label="Data dos sinais:" initialValue={moment(moment().format('L'), 'DD/MM/YYYY')} rules={[{required: true, message: 'Campo Obrigatório!' }]}>
                    <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item name="sinais_adicionados" className="addSinal" label="Digite os sinais abaixo:" rules={[{required: true, message: 'Campo Obrigatório!' }]}>
                    <TextArea rows={6} />
                </Form.Item>
            </Form>
        </Modal>

        <div className="sinaisHeader">
            <Space>
                <Button
                onClick={() => setmodalSinal(true)} 
                className="buttonAction"
                >
                <AlertOutlined style={{fontSize: 17}} /> Novo Produto
                </Button>

                <Select defaultValue="Selecione um tipo de produto...">
                {categorias.map((categoria, x) => {
                    return (
                        <Option key={x} value={categoria}>{categoria}</Option>
                    )
                })}
            </Select>
            </Space>
        </div>
        <Table 
        dataSource={produtos} 
        rowKey="id"
        columns={columns} 
        pagination={false}
        className="tableSinais"
        />
        </>
    );
}

export default Produtos;