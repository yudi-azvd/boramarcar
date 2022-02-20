import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'antd/dist/antd.css'

// https://github.com/ant-design/ant-design/issues/26136#issuecomment-965111940
// Não resolve
// eslint-disable-next-line
const consoleError = console.error.bind(console);
// eslint-disable-next-line
console.error = (errObj, ...args) => {
  if (
    process.env.NODE_ENV === 'development' && typeof errObj.message === 'string' && args.includes('findDOMNode')
  ) {
    return;
  }
  consoleError(errObj, ...args);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
