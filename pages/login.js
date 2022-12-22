import styles from '../styles/login.module.css'
import { Form, Input, Button, Checkbox, notification } from 'antd';
import Head from 'next/head'
import axios from "axios";
import { useRouter } from 'next/router'
import {WarningOutlined} from '@ant-design/icons';
import AuthContext from '../context/authContext';
import { useContext } from 'react';

const Login = () => {

    const router = useRouter()
    const { entrar } = useContext(AuthContext);

    const loginApi = async (values) => {
        const resultLogin = await entrar(values);

        if(resultLogin.data.message == "login success"){
            router.push('/admin')
        }else{
            notification.open({
				message: 'Usuário ou senha incorretos.',
				icon: <WarningOutlined style={{ color: '#faad14' }} />,
			});
        }
    }

    return ( 
    <div className={styles.container}>
        <Head>
            <title>Toffee</title>
        </Head>
        <div className={styles.subcontainer}>
            <h1>Painel de controle</h1>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={loginApi}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                    label="Usuário"
                    name="username"
                    rules={[{ required: true, message: 'Usuário é um campo obrigatório' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Senha é um campo obrigatório' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Lembrar-me</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Entrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div> 
    );
}
 
export default Login;