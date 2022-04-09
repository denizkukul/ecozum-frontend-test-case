import axios from 'axios';

export const endpoints = {
  base: 'https://6249a1e8fd7e30c51c042ccb.mockapi.io/api',
  signup: '/signup',
  packages: '/packages',
  payment: '/payment'
}

export const server = axios.create({
  baseURL: endpoints.base,
})