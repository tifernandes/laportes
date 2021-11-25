// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {

    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if(req.method === 'POST'){

      const data = req.body;
      var message;

      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/toffee?retryWrites=true&w=majority');
        const db = client.db();

        const pedidoCollenction = db.collection('pedidos');

        const result = await pedidoCollenction.insertOne(data);
        message = 'Pedido enviado';
        
        client.close();

        res.status(201).json({ _id: result.insertedId ,message });
      }catch(e){
        console.log('cardapioApi error: '+ e);
      }
    }

    if(req.method === 'GET'){
      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/toffee?retryWrites=true&w=majority');
        const db = client.db();

        const pedidoCollenction = db.collection('pedidos');
        const pedido = await pedidoCollenction.findOne({ _id: ObjectId(req.query._id) });

        client.close();

        res.status(200).json([
          pedido
        ])

      }catch(e){
        console.log('cardapioApi error: '+ e);
      }
  }
}
