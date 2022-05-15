import React from 'react'
import ReactDOM from 'react-dom'

import '@/config/firebase'

import 'antd/dist/antd.css'
import Router from './routes/router'

ReactDOM.render(
  // solução temporária
  // https://github.com/ant-design/ant-design/issues/22493#issuecomment-608959024
  <React.StrictMode>
    <Router />
  </React.StrictMode>
  ,
  document.getElementById('root')
)
