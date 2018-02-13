import * as React from 'react';
import { createForm } from 'rc-form';
import { List, InputItem } from 'antd-mobile';
import SendVerify from '@components/sendVerify/sendVerify';
import { TabMode, LoginMode } from '../../interface';
import { filter, map } from 'rxjs/operators';
import './register.scss';

interface RegisterProps {
  form?: any;
}

@createForm()
export default class Register extends React.Component<RegisterProps, any> {
  static defaultProps = { 
    
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div id="register">
        <div className="login-form">
          <List>
            <div className="form-group">
              <InputItem
                {...getFieldProps('mobile', {
                  rules: [
                    { required: true, message: '请输入您的手机号码' },
                    { pattern: /^((1[3-8][0-9])+\d{8})$/, message: '请填写正确的手机号码' },
                    {
                      validator: (rule, value, callback) => {
                        if (/^((1[3-8][0-9])+\d{8})$/.test(value)) {
                        }
                        callback();
                      }
                    }
                  ]
                }) }
                maxLength="11"
                placeholder="请输入手机号"
                moneyKeyboardAlign="left"
              ></InputItem>
            </div>
            <div className="flex jc-between form-group">
              <div className="flex-g-1">
                <InputItem
                  {...getFieldProps('verify', {
                    rules: [
                      { required: true, message: '请填写验证码' }
                    ]
                  }) }
                  maxLength="6"
                  placeholder="请输入短信验证码"
                  typ="number"
                  moneyKeyboardAlign="left"
                ></InputItem>
              </div>
              <SendVerify ref="send"></SendVerify>
            </div>
          </List>
        </div>
        <div className="login-btn">下一步</div>
      </div>
    );
  }
}