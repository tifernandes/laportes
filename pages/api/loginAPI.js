// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';
const jwt = require('jsonwebtoken');
import { parseCookies, setCookie, destroyCookie } from 'nookies'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {

    if(req.method === 'POST'){

      const {username, password} = req.body

      var message;
      var accessToken;

      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/toffee?retryWrites=true&w=majority');
        const db = client.db();

        const userCollenction = db.collection('usuarios');

        if(username && password){
            const user = await userCollenction.findOne({ username })

            if (user && user.password === password) {
                accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET)
                                
                message = 'login success';
            } else {
                message = "Credentials wrong";
            }
        }else{
            message = 'no data for login';
        }
        
        client.close();

        res.status(201).json({ message, accessToken });
      }catch(e){
        console.log('cardapioApi error: '+ e);
      }
    }

    if(req.method === 'GET'){
        try{
            res.status(200).json([
                "rota em construção =D"
            ])
        }catch(e){
            console.log('cardapioApi error: '+ e);
        }
    }
}
