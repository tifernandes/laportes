import React, { createContext, useState, useEffect } from 'react';
import { Modal } from 'antd';

const AuthContext = createContext({signed: Boolean, user: Object, loading: Boolean, entrar: () => {}, sair: () => {} })

export const AuthProvider = ({ children }) => {
    // const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
    const [signed, setSigned] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);

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

    const ModalCmp = () => {
        return (
            <Modal title="Prezado Cliente" visible={showModal} footer={null} onCancel={() => setShowModal(false)}>
                <p>No dia do aniversário, o aniversariante ganha R$50 em sua comanda</p>
                <br/>
                <p>Regras:</p>
                <p>-Mínimo de seis pessoas na mesa</p>
                <p>-Apresentação de documento com foto</p>
                <p>OBS: Sem o documento o desconto não se aplica</p>
                <br/>
                <p>Agradecemos a preferência</p>
            </Modal>
        )
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
            <ModalCmp />
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;