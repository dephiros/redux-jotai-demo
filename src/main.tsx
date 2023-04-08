import { Suspense } from 'preact/compat';
import { render } from 'preact';
import { App } from './app';
import { setup } from 'twind';
import * as colors from 'twind/colors';

setup({
  theme: {
    extend: {
      colors,
    },
  },
});

import './index.css';

render(
  <Suspense fallback="loading...">
    <App />
  </Suspense>,
  document.getElementById('app') as HTMLElement
);
