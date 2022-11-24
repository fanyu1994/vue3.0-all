import fetch from '../utils/request'

export const getData = (data?: any) => fetch('get', '/menu', data)

export const getIP = (data?: any) => fetch('get', '/getIP', data)
