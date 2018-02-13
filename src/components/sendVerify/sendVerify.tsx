import React from "react";
import './sendVerify.scss';
import { Subscription } from "rxjs/Subscription";
import { Button } from 'antd-mobile';
import { interval } from 'rxjs/observable/interval';
import { take, map, filter } from 'rxjs/operators';

interface Props {
  mobile?: string;
  node?: HTMLDivElement
  // [key:string]:any;
  children?: React.ReactChild
}

interface State {
  text: string;
  sub$?: Subscription;
}

export default class SendVerify extends React.Component<Props, State> {
  constructor(props?: Props) {
    super(props);
    this.state = {
      text: "发送短信",
      sub$: null
    }
  }
  private sendPhone(e): void | boolean {
    e.stopPropagation();
    let node = this.refs.node as HTMLDivElement;
    if (node.classList.contains("send")) return false;
    node.classList.add("send");
    this.setState({
      text: "验证码已发送"
    });
    setTimeout(() => {
      this.getTime(node);
    }, 1000);
  }
  private getTime(node: HTMLDivElement): void {
    let items: number = 60;
    let sub$: Subscription = interval(1000).pipe(take(60))
      .subscribe({
        next: (res) => {
          this.setState({
            text: `${items - res - 1}秒后重新获取`
          })
        },
        complete: () => {
          this.setState({
            text: "重新获取验证码"
          })
          node.classList.remove("send");
        }
      })
    this.setState({
      sub$: sub$
    })
  }
  unsub = () => {
    const node = this.refs.node as HTMLDivElement;
    if (this.state.sub$) {
      this.state.sub$.unsubscribe();
      this.setState({
        text: "发送短信"
      })
      node.classList.remove("send");
    };
  }
  componentWillUnmount() {
    this.unsub();
  }
  render() {
    const { text } = this.state;
    return (
      <div id="send-box">
        <div onClick={(e) => { this.sendPhone(e); }} ref="node">{text}</div>
      </div>
    );
  }
}