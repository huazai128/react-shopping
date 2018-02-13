import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import './index.scss';
useStrict(true);
import { Provider } from 'mobx-react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

// const Demo = asyncComponent({
//   resolve: () => System.import('./demo'),
// });

const MainLogin = asyncComponent({
  resolve: () => System.import('views/login/main'),
})

ReactDOM.render(
  <Provider>
    <Router>
      <Switch>
        <Route path="/" component={MainLogin} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLDivElement
);