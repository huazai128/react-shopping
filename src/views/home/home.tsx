import * as React from 'react';
import { Link } from 'react-router-dom';
import "./home.scss";

const NavItem = (nav:NavType) => (
  <div className="nav-item flex jc-between flex-vcenter">
    <div className={`nav-fl`}>{nav.title}</div>
    <div className="nav-fr">{ nav.value }</div>
  </div>
)
export interface NavType{
  title?:string;
  icon?:string;
  value?:string;
}

export interface PropsType {

}

export default class Home extends React.Component<PropsType,any>{
  render(){
    const navs:NavType[] = [
      { title:"绑定消费", icon:"",value:'广州正佳广场店'},
      { title:"消费记录", icon:""},
      { title:"礼品换购", icon:""},
      { title:"积分明细", icon:"",value:'共1000积分'},
      { title:"售后服务", icon:""}
    ]
    return(
      <div id="home">
        <div className="head flex">
          <div className="flex flex-g-1 flex-vcenter">
            <p>Hi，迪丽热巴</p>
            <div className="sign">签到</div>
          </div>
          <div className="avatar"><img src={ require('img/logo.png') } /></div>
        </div>
        <div className="card-box">

        </div>
        <div className="navs">
          { navs.map((item,index) => {
            return (
              <NavItem {...item} />
            )
          }) }
        </div>
      </div>
    )
  }
}
