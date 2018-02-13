import * as React from 'react';
import './radio.scss';

export interface RadioProps {
  typeName?: string;
  disabled?: boolean;
  checked: boolean;
  change?: Function;
  value: string;
  label?: string;
}
function noop() { }

export default class RadioCom extends React.Component<RadioProps, any> {
  static defaultProps = {
    typeName: 'radio',
    disabled: false,
    checked: false,
    value: '',
    label: '',
    change: noop
  }
  render() {
    const { typeName, disabled, checked, value, label, change } = this.props;
    return (
      <div id="radio">
        <label className="flex flex-vcenter">
          <p className={`${checked ? 'select' : ''}`}>
            <input onChange={() => { change(); }} className='radio-type' type={typeName} disabled={disabled} checked={checked} value={value} />
          </p>
          <span>{label}</span>
        </label>
      </div>
    );
  }
}