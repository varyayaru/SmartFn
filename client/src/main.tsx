import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from './utils/themeProvider';
import { store } from './redux/store';
import { injectStore } from './services/axiosInstance';
import App from './App';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
);
