import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'

const theme = {
  token: {
    colorPrimary: '#ff7a1a',
    colorInfo: '#0b3a66',
    colorLink: '#ff7a1a',
    borderRadius: 11,
    fontFamily: "'Manrope', system-ui, sans-serif",
  },
  components: {
    Layout: {
      headerBg: 'transparent',
      bodyBg: '#ffffff',
      footerBg: '#061528',
    },
    Button: { fontWeight: 600 },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
