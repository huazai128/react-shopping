import * as React from 'react';
import "./confirm.scss";

export default class Confirm extends React.Component{
  render(){
    return(
      <div id="confirm">
        <div className="logo-com"></div>
        <div className="confirm-content">
          <div className="confirm-wx">
            <img src={ require('img/logo.png') } />
            <p>dadasdad</p>
          </div>
          <div className="confirm-address">
            <p>是否绑定</p>
            <span>Mlgule广州正佳广场店</span>
          </div>
        </div>
        <div className="confirm-btn">确定</div>
      </div>
    )
  }
}