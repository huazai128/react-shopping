import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import './index.scss';
useStrict(true);
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

const MainLogin = asyncComponent({
  resolve: () => System.import('views/login/main'),
})
const Confirm = asyncComponent({
  resolve: () => System.import('views/login/confirm'),
})
const Home = asyncComponent({
  resolve: () => System.import('views/home/home'),
})

ReactDOM.render(
  <Provider>
    <Router>
      <Switch>
        <Route exact path="/" component={MainLogin} />
        <Route path="/complete" component={Confirm} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLDivElement
);