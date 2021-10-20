import styles from '../styles/Index.module.css'
import Slide from '../components/Slide'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const Index = () => {
    return(
        <div className={styles.container}>
            <Head>
                <title>Laportes Restaurantes - Qualidade diferenciada</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            </Head>
            <div className={styles.cardapioContainer}>
                <div className={styles.cardapio}>
                    <div>
                        <h3 className="text-white">A arte da boa cozinha.</h3>
                        <h1 className="lg:text-9xl">Conheça nosso <br /> cardápio</h1>
                        <h2 className="text-white text-xl">E Retire seu pedido</h2>
                        <Link href="/cardapio">
                            <button>ACESSAR</button>
                        </Link>
                    </div>
                    <div className={styles.imgShadow}>
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
                    <div className="hidden lg:block">
                        <p>Conheça mais sobre os quase 40 anos de tradição do Laportes</p>
                        <FacebookOutlined className="cursor-pointer" />
                        <InstagramOutlined className="cursor-pointer" />
                    </div>
                    <div className="lg:hidden">
                        <p>O Laportes foi inaugurado em 1982 em Santo André por Marina Laporte, mulher forte que na época criava suas filhas ainda pequenas - Simone, Solange e Debora - sozinha, por conta da morte prematura do marido. Já no princípio, ainda adolescentes, as meninas começaram a ajudar a mãe. A união e trabalho árduo das quatro logo conquistou clientela cativa formada principalmente por empresários e executivos da região que encontraram ali um ambiente prático e agradável associado à culinária variada e de bom gosto que já se revelava neste início. 
                        As refeições sempre foram tipicamente caseiras, trazendo como característica principal a qualidade de pratos produzidos a partir dos melhores ingredientes. Com sabor muito especial, tornaram-se o principal atrativo para quem procurava uma culinária diferenciada na região. </p>
                        <p>Hoje, ainda sob o comando de todas e já com participação da terceira geração, o restaurante possui três unidades, localizadas em São Caetano do Sul, Santo André e Itaim Bibi. Com cardápios mais sofisticados do que os de 82, os restaurantes andam com base na experiência destes 34 anos, porém sem abandonar a principal orientação que consolidou seu sucesso: qualidade absoluta.
                        A maturidade das proprietárias propiciou o aprimoramento, somando a prática com a especialização em áreas específicas de administração,	gastronomia e higiene, onde cada uma delas visa a criação constante de receitas originais e a preparação de forma muito particular de receitas tradicionais. Aqui todas realizam atividades de criação e administração, orientando diretamente a equipe de funcionários. 
                        A equipe é treinada e supervisionada diariamente, em um clima agradável e familiar, que é refletido na rapidez e eficiência no atendimento aos clientes. 
                        Este compromisso levado tão a sério transformou o Laportes numa das principais referencias gastronômicas da região do ABC e Capital Paulista.</p>
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
        </div>
    )
}

export default Index;