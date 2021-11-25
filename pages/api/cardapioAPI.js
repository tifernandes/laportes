// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_WEBSITE || 'https://laportes.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

// eslint-disable-next-line import/no-anonymous-default-export
const CardapioAPI = async (req, res) => {

    if(req.method === 'POST'){

      const data = req.body;
      var message;

      try{
        const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/toffee?retryWrites=true&w=majority');
        const db = client.db();

        const cardapioCollenction = db.collection('cardapio');

        if(data.id){
          const updateProduto = await cardapioCollenction.updateOne({ _id: ObjectId(data.id) }, { $set: data })
          message = 'Produto atualizado';
        }else{
          const result = await cardapioCollenction.insertOne(data);
          message = 'Produto inserido';
        }
        
        client.close();

        res.status(201).json({ message });
      }catch(e){
        console.log('cardapioApi error: '+ e);
      }
    }

    if(req.method === 'GET'){

    try{
      const client = await MongoClient.connect('mongodb+srv://tifernandes:Fer27640329@cluster0.kuspg.mongodb.net/toffee?retryWrites=true&w=majority');
      const db = client.db();

      const cardapioCollenction = db.collection('cardapio');

      const cardapio = await cardapioCollenction.find().toArray();

      client.close();

      function groupByArray(xs, key) { return xs.reduce(function (rv, x) { let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv; }, []); }

      const categoryProductsList = groupByArray(cardapio, 'categoria');

      res.status(200).json([
        categoryProductsList
      ])

    }catch(e){
      console.log('cardapioApi error: '+ e);
    }
  }
}

module.exports = allowCors(CardapioAPI)