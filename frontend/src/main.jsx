import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'

const theme = {
  token: {
    colorPrimary: '#00b4d8',
    colorInfo: '#00b4d8',
    colorLink: '#00b4d8',
    borderRadius: 8,
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#ffffff',
      footerBg: '#0a2540',
    },
    Menu: {
      itemSelectedColor: '#00b4d8',
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
