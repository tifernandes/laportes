// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {

    if(req.method === 'POST'){

      const data = req.body;
      console.log(data);
      var message;

      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/laportes?retryWrites=true&w=majority');
        const db = client.db();

        const pedidoCollenction = db.collection('pedidos');

        const result = await pedidoCollenction.insertOne(data);
        console.log(result);
        console.log(result.insertedId);

        message = 'Pedido enviado';
        
        client.close();

        res.status(201).json({ _id: result.insertedId ,message });
      }catch(e){
        console.log('cardapioApi error: '+ e);
      }
    }

    if(req.method === 'GET'){
      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/laportes?retryWrites=true&w=majority');
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
