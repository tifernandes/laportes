// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';
import AllowCors from '../../components/AllowCors'

// eslint-disable-next-line import/no-anonymous-default-export
const PedidosAPI = async (req, res) => {

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

module.exports = AllowCors(PedidosAPI)