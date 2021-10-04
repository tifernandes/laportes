// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
  res.status(200).json([
    {
      id: 1,
      nome: 'Trança doce de mandioquinha',
      valor: 30,
      descricao: 'Supermacia e com recheio de creme de baunilha e casquinha de açúcar no topo',
      categoria: 'Pães'
    },
    {
      id: 2,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Pães'
    }
  ])
}
