import styles from '../styles/Index.module.css'
import Slide from '../components/Slide'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { Alert, Form, Input  } from 'antd';
import { useState } from 'react'
import InputMask from 'react-input-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import 'animate.css'
import axios from "axios";

const Index = () => {
    
    const [enviado, setEnviado] = useState(false);

    const enviarContato = async values => {
        const endPoint = process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.vercel.app';
        const contatoAPI = await axios.post(`${endPoint}/api/contatoAPI`, values);

        if(contatoAPI.data.message == "Success"){
            setEnviado(true);
        }else{
            alert("Erro ao entrar em contato.")
        }
        
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Laportes Restaurantes - Qualidade diferenciada</title>
            </Head>
            <div className={styles.cardapioContainer}>
                <div className={styles.cardapio}>
                    <div className="animate__animated animate__fadeIn">
                        <h3 className="text-white">A arte da boa cozinha.</h3>
                        <h1 className="lg:text-9xl">Conheça nosso <br /> cardápio</h1>
                        <h2 className="text-white text-xl">E Retire seu pedido</h2>
                        <Link href="/cardapio">
                            <button>ACESSAR</button>
                        </Link>
                    </div>
                    <div className={`${styles.imgShadow} animate__animated animate__fadeIn`}>
                        <div className="lg:hidden">
                            <Slide />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.fullLayout}>
                <div id="historia" className={styles.historia}>
                    <h3>A tradição dos sabores</h3>
                    <div className={styles.divisor}></div>
                    <div className="hidden lg:block p-5">
                        <p>Conheça mais sobre os quase 40 anos de tradição do Laportes nas redes sociais</p>
                        <br/>
                        <Link href="https://web.facebook.com/restaurantelaportes">
                            <a className={styles.fa} style={{background: '#3B5998'}} target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                        </Link>
                        <Link href="https://www.instagram.com/laportescompany/">
                            <a className={styles.fa} style={{background: '#dd4b39'}} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                        </Link>
                        <Link href="https://www.tiktok.com/@laportescompany">
                            <a className={styles.fa} style={{background: '#2c4762'}} target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
                        </Link>
                    </div>
                    <div className="lg:hidden">
                        <p>O Laportes foi inaugurado em 1982 em Santo André por Marina Laporte, mulher forte que na época criava suas filhas ainda pequenas - Simone, Solange e Debora - sozinha, por conta da morte prematura do marido. Já no princípio, ainda adolescentes, as meninas começaram a ajudar a mãe. A união e trabalho árduo das quatro logo conquistou clientela cativa formada principalmente por empresários e executivos da região que encontraram ali um ambiente prático e agradável associado à culinária variada e de bom gosto que já se revelava neste início. As refeições sempre foram tipicamente caseiras, trazendo como característica principal a qualidade de pratos produzidos a partir dos melhores ingredientes. Com sabor muito especial, tornaram-se o principal atrativo para quem procurava uma culinária diferenciada na região.</p>
                        <p>Hoje, ainda sob o comando de todas e já com participação da terceira geração, o restaurante possui duas unidades, localizadas em São Caetano do Sul e Santo André. Com cardápios mais sofisticados do que os de 82, os restaurantes andam com base na experiência destes 34 anos, porém sem abandonar a principal orientação que consolidou seu sucesso: qualidade absoluta. A maturidade das proprietárias propiciou o aprimoramento, somando a prática com a especialização em áreas específicas de administração, gastronomia e higiene, onde cada uma delas visa a criação constante de receitas originais e a preparação de forma muito particular de receitas tradicionais. Aqui todas realizam atividades de criação e administração, orientando diretamente a equipe de funcionários. A equipe é treinada e supervisionada diariamente, em um clima agradável e familiar, que é refletido na rapidez e eficiência no atendimento aos clientes. Este compromisso levado tão a sério transformou o Laportes em uma das principais referências gastronômicas da região do ABC.</p>
                        <h3>Ass. Laportes</h3>
                    </div>
                </div>
            </div>
            <div id="unidades" className={styles.unidades}>
                <div className={styles.unidade}>
                    <div className={styles.endereco}>
                        <h3>Unidade Santo André</h3>
                        <p>Rua Vitória Régia, 1419 - Campestre</p>
                        <p>das 11:30h às 15h</p>
                        <p>(11) 4991-8466</p>
                        <p>*Fechado aos domingos</p>
                    </div>
                    <Image src="/laportes_santoAndre.jpg" width={380} height={280} />
                    <iframe
                    src="https://maps.google.com/maps?q=Rua%20Vit%C3%B3ria%20R%C3%A9gia,%201419%20-%20Campestre&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="380"
                    height="280"
                    className="lg:w-11/12"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    />
                </div>
                <div className={styles.unidade}>
                    <div className={styles.endereco}>
                        <h3>Unidade São Caetano do Sul</h3>
                        <p>Rua Pernambuco, 400 - Centro</p>
                        <p>das 11:30h às 15h</p>
                        <p>(11) 4226-7607</p>
                        <p>*Fechado aos sábados</p>
                    </div>
                    <Image src="/laportes_scs.jpg" width={380} height={280} />
                    <iframe
                    src="https://maps.google.com/maps?q=Rua%20Pernambuco,%20400%20-%20Centro&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="380"
                    height="280"
                    className="lg:w-11/12"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    />
                </div>
            </div>
            <div id="contato" className={styles.contatoContainer}>
                <div className={styles.contato}>
                    <div className="text-center">
                        <h3>Restou alguma dúvida ?</h3>
                        <p>Envie sua mensagem agora mesmo preenchendo os campos abaixo, entraremos em contato posteriormente.</p>
                    </div>
                    <div className={styles.contatoSub} style={{display: enviado ? 'none' : 'block' }}>
                        <Form
                            name="basic"
                            id="dataForm"
                            initialValues={{ remember: true }}
                            onFinish={enviarContato}
                            requiredMark={false}
                            // onFinishFailed={onFinishFailed}
                        >
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
                                    label="Mensagem:"
                                    name="mensagem"
                                    rules={[
                                        { required: true, message: 'Favor escrever mensagem.' }
                                    ]}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item>
                                    <button>Enviar</button>
                                </Form.Item>
                        </Form>
                    </div>
                    <div className={styles.contatoEnviado} style={{display: enviado ? 'block' : 'none' }}>
                        <button>Mensagem enviada !</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;