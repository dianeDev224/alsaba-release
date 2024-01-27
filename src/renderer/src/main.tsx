// @ts-nocheck
import '@renderer/assets/index.css';

import React from 'react';

import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import ReactDOM from 'react-dom/client';

import { LoaderState } from '@renderer/hooks/loader';
import Approuter from '@renderer/Router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: {Tailwind}}}>
      <LoaderState>
        <Approuter />
      </LoaderState>
    </PrimeReactProvider>
  </React.StrictMode>
)
