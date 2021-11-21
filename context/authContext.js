import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { parseCookies, setCookie } from 'nookies'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
    const [signed, setSigned] = useState('');
    const [loading, setLoading] = useState(true);
    const [showCarrinho, setShowCarrinho] = useState(false);
    const [pedidoShow, setPedidoShow] = useState(false);
    const [user, setUser] = useState(null);

    //verifica se ja existe token
    useEffect(() => {
        // if (storageUser) {
        //     setSigned(true);
        // }

        const { jid } = parseCookies()
        console.log(jid)

        setLoading(false)
    }, []);

    async function entrar(values){
        const resultLogin = await axios.post(`/api/loginAPI`, values);
        console.log(resultLogin);

        if(resultLogin.data.message == 'login success'){
            setCookie(null, 'jid', resultLogin.data.accessToken, {

            })
        }
        
        return resultLogin
    }

    function sair(){
        // setLoading(true)
        // removeStorageUser()
        // // localStorage.clear();
        // setSigned(false)
        // window.location.href = "/entrar";
    }

    return (
        <AuthContext.Provider value={{ showCarrinho, setShowCarrinho, setLoading, loading, pedidoShow, setPedidoShow, entrar}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;