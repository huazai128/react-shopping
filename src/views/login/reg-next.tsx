import * as React from 'react';
import { createForm } from 'rc-form';
import { List, InputItem } from 'antd-mobile';
import RadioCom from '@components/radio/radio';
import "./reg-next.scss";

interface RegNextType {
  form?: any;
}

@createForm()
export default class RegNext extends React.Component<RegNextType, any> {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0
    }
  }
  radioChange = (index:number) => {
    console.log(index);
    this.setState({
      idx:index
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { idx } = this.state;
    const data = [
      { value: 0, label: '女', },
      { value: 1, label: '男', },
    ];
    return (
      <div id="next">
        <List>
          <div className="form-group flex">
            <div className="label">* 姓名</div>
            <div className="input-item flex-g-1">
              <InputItem
                {...getFieldProps('username', {
                  rules: [
                    { required: true, message: '请输入您的姓名' },
                  ]
                })}
                maxLength="20"
                placeholder="请输入姓名"
                moneyKeyboardAlign="left"
              ></InputItem>
            </div>
          </div>
          <div className="flex jc-between form-group">
            <div className="label">* 性别</div>
            <div className="flex-g-1 flex">
              { data.map((item,index) => {
                return (
                  <div key={index} className="flex-col-3">
                    <RadioCom value={ item.value }  label={ item.label } change={() => { this.radioChange(index); }} checked={ index === idx} />
                  </div>
                )
              }) }
            </div>
          </div>
          <div className="flex form-group">
            <div className="label">* 生日</div>
            <div className="flex-g-1 "></div>
          </div>
        </List>
        <div className="login-btn">注册</div>
      </div>
    );
  }
}