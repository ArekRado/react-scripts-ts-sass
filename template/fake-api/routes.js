module.exports = (server, db) => {
  server.get('/pizzas', (req, res) => {
    const page = req.query.page || 0
    const perPage = 12
    const pizzas = db.get('pizzas')

    // throw new Error('xd')

    res.json({
      data: pizzas.slice(page * perPage, page * perPage + 12),
      total: pizzas.size(),
    })
  })

  server.get('/pizzas/:id', (req, res) => {
    const id = req.params.id || -1
    const pizza = db
      .get('pizzas')
      .find({ id })
      .value() || {
      id: '',
      name: '',
      adjective: '',
      price: 0,
      ingredients: [],
      image: '',
      description: '',
    }

    res.json(pizza)
  })

  server.get('/search', (req, res) => {
    const text = req.query.text || ''
    const pizzasDB = db.get('pizzas').value()
    const pizzas = pizzasDB.filter(
      pizza =>
        pizza.name.search(text) !== -1 ||
        pizza.adjective.search(text) !== -1 ||
        pizza.description.search(text) !== -1 ||
        pizza.ingredients.some(ingredient => ingredient.search(text) !== -1),
    )

    res.json({
      data: pizzas.slice(0, 12),
      total: pizzas.length,
    })
  })
}
