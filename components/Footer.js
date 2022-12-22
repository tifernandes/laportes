import styles from '../styles/Footer.module.css'

const Footer = () => {
    return ( 
        <footer className={styles.container}>
            <p>Copyright © 2021 Laportes Restaurantes | Desenvolvido por <a target="_blank" rel="noreferrer" href="https://www.instagram.com/devtoffee/">DevToffee</a></p>
        </footer>
    );
}
 
export default Footer;