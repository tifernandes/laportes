import React, { useEffect, useState, useContext } from 'react';
// import AuthContext from '../context/authContext';
import { RiseOutlined, HomeOutlined, BarChartOutlined, InstagramOutlined, QuestionCircleOutlined , RobotOutlined, MenuUnfoldOutlined, DollarOutlined, ReadOutlined, VideoCameraOutlined} from '@ant-design/icons';
import { Layout, Menu, Drawer, Modal, Button } from 'antd';
// import { withRouter, useHistory } from 'react-router-dom';
// import UserTools from './userTools';
// import './styles/menu.css';
// import logo from './images/logo.png';
// import logoMarca from './images/logomarca.png';
import Link from 'next/link'
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = ({ children }) => {

    const router = useRouter()

    const [mobileLogo, setmobileLogo] = useState({ display: 'none' });
    const [siderPosition, setsiderPosition] = useState({ position: 'relative' });
    const [mobileUserName, setmobileUserName] = useState({ display: 'block' });
    const [collapsed, setCollapsed] = useState(false);
    const [drwVisible, setdrwVisible] = useState(false);
    // const { user } = useContext(AuthContext)

    function showDrawer() {
        setdrwVisible(true)
    };

    function onClose() {
        setdrwVisible(false)
    };

    const responsiveMenu = (broken) => {
        //se estiver no breakpoint esconde menu e ativa logo responsivo
        //se nao estiver mostra menu e esconde logo responsivo
        if(broken){
            setmobileLogo({ display: 'flex' })
            setmobileUserName({ display: 'none' })
            setCollapsed(true)
        }else{
            setmobileLogo({ display: 'none' })
            setsiderPosition({ position: 'relative', minHeight: '100vh' })
            setmobileUserName({ display: 'block' })
            setCollapsed(false)
            setdrwVisible(false)
        }
    };

    // const history = useHistory();

    // const siderMenuClick = (path) => {
    //     history.push(path)
    //     setdrwVisible(false)
    // }

    const SiderMenu = () => {
        return (
            <>
                <div className="flex items-center flex-col mt-7">
                    <p className="text-sm text-white">Painel</p>
                    <h3 className="text-4xl text-white">Laportes</h3>
                </div>

                <Menu theme="dark" mode="inline" selectedKeys={router.pathname}>
                    
                    <Menu.Item key="/admin" icon={<HomeOutlined />}>
                        <Link href="/admin">
                            <a>Inicio</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/produtos" icon={<BarChartOutlined />}> 
                        <Link href="/admin/produtos">
                            <a>Produtos</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/pedidos" icon={<BarChartOutlined />}> 
                        <Link href="/admin/pedidos">
                            <a>Pedidos</a>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/clientes" icon={<BarChartOutlined />}> 
                        <Link href="/admin/clientes">
                            <a>Clientes</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </>
        )
    }

    return (
        <>
        <Layout>
            <Sider
                trigger={null} 
                collapsed={collapsed}
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    responsiveMenu(broken);
                }}
                style={{zIndex: 10000}}
                width={208}
            >
                <SiderMenu />
            </Sider>
            <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                <div className="headerMenuCenter">
                    <div style={mobileLogo} className="buttonsLeftHeader">
                        {/* <img className="logoResponsive" src={logoMarca} alt="TraderNess" /> */}
                        {React.createElement(MenuUnfoldOutlined, {
                            className: 'trigger',
                            onClick: showDrawer,
                        })}
                    </div>
                    <div className="flexDiv"></div>
                    {/* <UserTools username={user.nome} visible={mobileUserName} /> */}
                </div>
            </Header>
            <Content style={{ margin: '24px 5px 0' }}>
                <div className="site-layout-background" style={{ padding: '2% 3%', minHeight: 360, background: 'none' }}>
                    {/* Conteudo da pagina dinamica */}
                    {children}
                </div>
            </Content>
            {/* <div className="suporte">
                <a href="https://t.me/tradernesstl" target="_blank">
                    <Button type="primary" className="bt-suporte" shape="round" icon={<QuestionCircleOutlined />} size="large">
                        Suporte
                    </Button>
                </a>
            </div> */}
            {/* <Footer style={{ textAlign: 'center', fontWeight: '450' }}>
                <a href="https://www.instagram.com/traderness/" target="blank_">
                    <InstagramOutlined style={{fontSize: '30px', color: '#7265e6'}} />
                    <p style={{color: 'black'}}>
                        TraderNess ©2020
                    </p>
                </a>
            </Footer> */}
            </Layout> 
        </Layout>



        {/* Drawer para menu responsivo */}
        <Drawer
        placement='left'
        closable={false}
        onClose={onClose}
        visible={drwVisible}
        bodyStyle={{padding: 0, backgroundColor: '#001529'}}
        width='auto'
        key='left'
        className="menuResposive"
        >
            <Sider
            trigger={null} 
            collapsed={false}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                responsiveMenu(broken);
            }}
            style={siderPosition}
            width={208}
            >
                <SiderMenu />
            </Sider>
        </Drawer>
        </>
    )
}

export default LayoutAdmin;