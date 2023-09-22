import React, { Component } from 'react';

class RerenderExample extends Component {
  handleClick() {
    // 在点击事件中调用forceUpdate方法
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>强制重新渲染</button>
        <p>当前时间：{new Date().toLocaleTimeString()}</p>
      </div>
    );
  }
}

export default RerenderExample;
