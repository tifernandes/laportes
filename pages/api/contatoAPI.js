// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';
const sendEmail = require('../../components/SendEmail');

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {

    if(req.method === 'POST'){

      const data = req.body;

      var message = 'Success';

      try{
        const toffeEmailCliente = "restaurante@laportes.com.br";
        let subject = 'Nova Mensagem do formulário de contato!';
        let html = 'Nome do cliente: '+data.nomeCompleto+'<br/>Email: '+data.email+'<br/>Celular: '+data.celular+'<br/>Mensagem: '+data.mensagem+'';
        sendEmail(toffeEmailCliente, data.email, subject, html);

        res.status(201).json({ message });
      }catch(e){
        console.log('contatoAPI error: '+ e);
      }
    }
}
