const {range} = require('ramda')
const f = require('faker')

const randomNumber = () => parseInt((Math.random() * 100 + 200).toString(), 10).toString()
const getRandomImage = () => `//picsum.photos/${randomNumber()}/100/?random`

module.exports = range(0, 1000).map(() => ({
  adjective: f.commerce.productAdjective(),
  description: f.lorem.paragraph(),
  id: f.random.uuid(),
  image: getRandomImage(),
  ingredients: range(1, 7).map(() => f.commerce.productMaterial()),
  name: f.commerce.productName(),
  price: f.commerce.price(),
}))
