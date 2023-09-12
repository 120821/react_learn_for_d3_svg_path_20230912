### 安装D3库

```
npm install d3

```
或者：
```
yarn add d3
```
### 在React组件中导入D3和react的useEffect钩子

```
import React, { useEffect } from 'react';
import * as d3 from 'd3';
```

### 在钩子里使用D3：
```
const MyComponent = () => {
  useEffect(() => {
    // D3 的路径生成器
    const pathGenerator = d3.path();

    // 设置路径命令
    pathGenerator.moveTo(50, 50);
    pathGenerator.lineTo(200, 50);
    pathGenerator.lineTo(200, 200);
    pathGenerator.closePath();

    // 创建 SVG 路径元素
    const svgPath = pathGenerator.toString();

    // 在控制台输出 SVG 路径字符串
    console.log(svgPath);
  }, []);

  return <svg />;
};
```

### 在jsx中渲染svg:
```
const MyComponent = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // D3 的路径生成器...
    // ...

    // 获取 SVG 元素的引用
    const svgElement = d3.select(svgRef.current);

    // 添加 SVG 路径元素到 SVG 元素中
    svgElement.append('path').attr('d', svgPath);
  }, []);

  return <svg ref={svgRef} />;
};
```
