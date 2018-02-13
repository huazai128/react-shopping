import * as React from 'react';
import { TabMode, LoginMode } from '../../interface';
import { filter, map } from 'rxjs/operators';
import Register from './register';
import Login from './login';
import RegNext from './reg-next';
import './main.scss';

interface Props {
  children?: React.ReactNode
}
interface State {
  navs: TabMode[];
  index: number;
  isShow?: boolean;
  [key: string]: any;
}

export default class MainLogin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      navs: [
        { title: "登录", active: true },
        { title: "注册", active: false },
      ],
      index: 0,
      isShow: false
    }
  }
  tabActive(item, idx) {
    let navs = this.state.navs;
    const node = this.refs.send as any;
    let page: number;
    navs.map((item: TabMode, index: number) => {
      item.active && (item.active = false);
      if (Object.is(idx, index)) item.active = true;
      item.active && (page = index);
      return item;
    })
    this.setState({
      navs: navs,
      index: page
    });
  }
  render() {
    const { navs, index, isShow } = this.state;
    return (
      <div id="login-main">
        <div className="logo-com"></div>
        {isShow && (
          <div>
            <div className="login-nav flex">
              {navs.map((item, index) => {
                return <div key={index} className={item.active ? 'active' : ''} onClick={(e) => { this.tabActive(item, index); }}>{item.title}</div>
              })}
            </div>
            {Object.is(index, 0) && <Login />}
            {Object.is(index, 1) && <Register />}
          </div>
        )}
        { !isShow && <RegNext /> }
      </div>
    );
  }
}