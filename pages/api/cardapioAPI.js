// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {

    const products = [
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
    },
    {
      id: 3,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Pães'
    },
    {
      id: 4,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Pães'
    },
    {
      id: 5,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    },
    {
      id: 6,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    },
    {
      id: 7,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    },
    {
      id: 8,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    },
    {
      id: 9,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    },
    {
      id: 10,
      nome: 'Cinnamon Roll',
      valor: 9,
      descricao: 'pãezinhos enrolados com canela e açúcar, cobertos com glacê amanteigado e cremoso',
      categoria: 'Doces'
    }
  ]

  // const categoryProductsList = products.reduce((groups, item) => {
  //   const group = (groups[item.categoria] || []);
  //   console.log('group');
  //   console.log(group);
  //   group.push(item);
  //   console.log('groups[item.categoria]');
  //   console.log(groups[item.categoria]);
  //   groups[item.categoria] = group;
  //   return groups;
  // }, {});

  function groupByArray(xs, key) { return xs.reduce(function (rv, x) { let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv; }, []); }

  const categoryProductsList = groupByArray(products, 'categoria');

  res.status(200).json([
    categoryProductsList
  ])
}
