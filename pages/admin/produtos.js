import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Input, Modal, Spin, Space, Form, Collapse, Typography, InputNumber, notification, Select, Tag } from 'antd';
import { PlusOutlined, FlagOutlined, LoadingOutlined, CheckOutlined, CloseOutlined, CheckCircleOutlined, WarningOutlined} from '@ant-design/icons';
import 'moment/locale/pt-br';
import axios from "axios";

const { Option } = Select;
import Head from 'next/head'

const Produtos = () => {

    const [allProdutos, setAllProdutos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    // const [diaSelecionado, setDiaSelecionado] = useState(moment().format('L'))
    // const { user } = useContext(AuthContext)
    const [modalProduto, setModalProduto] = useState();
    const [modalProdutoTipo, setModalProdutoTipo] = useState("add");
    const [modalProdutoEdit, setModalProdutoEdit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reloadApis, setreloadApis] = useState(false);

    useEffect(() => {
        async function getProdutos(){
            const cardapioApi = await axios.get(`/api/cardapioAPI`);
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

            setCategorias(categoriasUnicas);
            setProdutos(produtos);
            setAllProdutos(produtos);

            setLoading(false)  
        }

        getProdutos();
    }, [reloadApis])

    const edit = record => {
        setModalProdutoTipo("edit");
        setModalProdutoEdit(record);
        setModalProduto(true)
    };

    const columns = [
    {
        title: 'Ativo',
        dataIndex: 'ativo',
        key: 'ativo',
        render: h => {
            if(h){
                return <CheckOutlined />
            }else{
                return <CloseOutlined />
            }
        }
    },
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        render: h => {
            return <>{h}</>
        }
    },
    {
        title: 'Categoria',
        dataIndex: 'categoria',
        key: 'categoria',
        render: m => {
            return( 
                m.map((e, x) => {
                    return (
                        <Tag key={x}>{e}</Tag>
                    )
                })
            )
        }
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor',
        render: d => {
            return (<>R$ {d}</>)
        }
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
        key: 'descricao',
        render: d => {
            return (<>{d}</>)
        }
    },
    {
        title: 'Ações',
        dataIndex: 'edit',
        key: 'edit',
        render: (_, record) => {
            return (
                <a style={{ marginRight: 8 }} onClick={() => edit(record)}>
                    Editar
                </a>
            )
        }
    },
    // {
    //     title: 'Imagem',
    //     dataIndex: 'imagem',
    //     key: 'imagem'
    //     // render: dia => moment(dia).format('L')
    // }
    ];
    
    const addProduto = async values => {
        values.ativo = true;
        const addProdutoResponse = await axios.post('/api/cardapioAPI', values)

        if(addProdutoResponse.data.message == 'Produto inserido' || addProdutoResponse.data.message == 'Produto atualizado'){
            setreloadApis(!reloadApis)
            setModalProduto(false)
            notification.open({
				message: 'Sucesso.',
				description: addProdutoResponse.data.message,
				icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
			});
        }else{
            notification.open({
				message: 'Erro ao adicionar produto.',
				icon: <WarningOutlined style={{ color: '#faad14' }} />,
			});
        }

    };

    const ModalProdutoCmp = (props) => {
        
        const { tipo } = props

        return (
        <Modal
            title={tipo == 'add' ? 'Novo Produto' : 'Editar Produto'}
            visible={modalProduto}
            footer={[
                <Button className="ant-btn ant-btn-primary" form="sinalForm" key="submit" htmlType="submit">
                    {tipo == 'add' ? 'Adicionar' : 'Salvar'}
                </Button>
            ]}
            onCancel={() => setModalProduto(false)}
        >
            <Form id="sinalForm" onFinish={addProduto} className="formAddSinal">
                <Form.Item
                    label="Id produto"
                    name="id"
                    initialValue={tipo == 'add' ? null : modalProdutoEdit._id} 
                    hidden
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nome produto"
                    name="nome"
                    rules={[
                        { required: true, message: 'Favor informar o nome do produto.' }
                    ]}
                    initialValue={tipo == 'add' ? null : modalProdutoEdit.nome} 
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Valor"
                    name="valor"
                    rules={[
                        { required: true, message: 'Favor informar valor do produto.' }
                    ]}
                    initialValue={tipo == 'add' ? null : modalProdutoEdit.valor}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Categoria"
                    name="categoria"
                    rules={[
                        { required: true, message: 'Favor informar categoria do produto.' }
                    ]}
                    initialValue={tipo == 'add' ? [] : 
                        modalProdutoEdit.categoria
                    }
                >
                    <Select mode="tags" tokenSeparators={[',']}>
                        {categorias.map((categoria, x) => {
                            return (
                                <Option key={x} value={categoria}>{categoria}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Descrição:"
                    name="descricao"
                    initialValue={tipo == 'add' ? '' : modalProdutoEdit.descricao}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
        )
    }

    const pesquisarHandle = value => {

        var produtosFilter = [];

        if(typeof value === 'string'){
            if(value == 'todos'){
                produtosFilter = allProdutos;
            }else{
                allProdutos.filter((e) => {
                     e.categoria.filter((f) => {
                        if(f.toLowerCase().includes(value.toLowerCase())){
                            produtosFilter.push(e)
                        }
                    })
                });
            }
        }else{
            produtosFilter = allProdutos.filter(function (e) {
                if(e.nome.toLowerCase().includes(value.target.value.toLowerCase())){
                    return e
                }
            });
        }

        setProdutos(produtosFilter);
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
        <Head>
            <title>Laportes - Produtos</title>
            <link rel="icon" href="/favicon.ico" /> 
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </Head>
        <ModalProdutoCmp tipo={modalProdutoTipo} />
        <div className="sinaisHeader">
            <Space>
                <Button
                onClick={() => {
                    setModalProdutoTipo("add") 
                    setModalProduto(true) 
                }} 
                className="buttonAction flex"
                >
                <PlusOutlined style={{fontSize: 17}} /> Novo Produto
                </Button>

                <Select defaultValue="Selecione um tipo de produto..." onChange={pesquisarHandle}>
                    <Option value="todos">Todos os produtos</Option>
                    {categorias.map((categoria, x) => {
                        return (
                            <Option key={x} value={categoria}>{categoria}</Option>
                        )
                    })}
                </Select>

                <Input 
                    style={{ textAlign: 'left' }} 
                    placeholder="Pesquisar por nome"
                    onChange={pesquisarHandle}
                />
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