import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({signed: Boolean, user: Object, loading: Boolean, entrar: () => {}, sair: () => {} })

export const AuthProvider = ({ children }) => {
    // const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
    const [signed, setSigned] = useState('');
    const [loading, setLoading] = useState(true);

    //verifica se ja existe token
    useEffect(() => {
        // if (storageUser) {
        //     setSigned(true);
        // }
        setLoading(false)
    }, []);

    async function entrar(email, senha){
        // const resCheck = await api.post(`/entrar`,{
        //   email: email,
        //   senha:  senha
        // });
        
        // if(resCheck.data[0] == 'Success'){
        //     setLoading(true)
        //     setStorageUser(resCheck.data[1])
        //     setSigned(true)
        //     window.location.href = "/";
        //     return 'Success'
        // }else if(resCheck.data[0] == 'Incorrect'){
        //     return 'Incorrect'
        // }
    }

    function sair(){
        // setLoading(true)
        // removeStorageUser()
        // // localStorage.clear();
        // setSigned(false)
        // window.location.href = "/entrar";
    }

    return (
        <AuthContext.Provider value={{ signed, loading, sair}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;