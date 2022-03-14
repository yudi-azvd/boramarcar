let localAddress = '' 
// Se está em ambiente de desenvolvimento, o servidor está no PC do dev
// e tem o mesmo endereço que o servidor React/Vite
if (import.meta.env.MODE === 'development') {
  // minha tentativa original
  // localAddress = window.location.href.replace(/^(http:\/\/.*):\d+\/?(\w+)?/, '$1')
  // origin: http://192.168.15.41:5000
  // =>  http://192.168.15.41 // remove os números no final
  localAddress = window.location.origin.replace(/:(\d+)?$/, '')
}

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS || localAddress
const PORT = import.meta.env.VITE_SERVER_PORT || 5000

let address = ''
if (import.meta.env.MODE === 'development') {
  address = `${SERVER_ADDRESS}:${PORT}`
} 
else { 
  // deve ser ambiente de produção. Nesse caso, como o
  // servidor está hospedado na Heroku, esse web app não deve depender
  // da porta
  address = `${SERVER_ADDRESS}`
}


export default address