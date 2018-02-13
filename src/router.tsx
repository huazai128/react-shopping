import { asyncComponent } from 'react-async-component';

const Demo = asyncComponent({
  resolve: () => System.import('./demo'),
});