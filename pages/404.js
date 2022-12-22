import styles from '../styles/404.module.css'

const PageNotFound = () => {
    return ( 
        <>
            <div className={styles.navbar}></div>
            <div className={styles.container}>
                <div>
                    <h1>Desculpe...</h1>
                    <h1>A Página socilitada não foi encontrada</h1>
                </div>
            </div>
        </>
     );
}
 
export default PageNotFound;