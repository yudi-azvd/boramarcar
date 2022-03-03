import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'antd/dist/antd.css'

ReactDOM.render(
  // solução temporária
  // https://github.com/ant-design/ant-design/issues/22493#issuecomment-608959024
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
  ,
  document.getElementById('root')
)
