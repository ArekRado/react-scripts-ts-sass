import { compile } from 'path-to-regexp'

export const HOME = '/pizzas/:page'
export const PIZZA_DETAILS = `/pizza-details/:id`

export const home = compile(HOME)
export const pizzaDetails = compile(PIZZA_DETAILS)
