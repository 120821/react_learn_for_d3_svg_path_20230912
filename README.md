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


### 使用中国地图

首先安装:

```
npm install d3 topojson
```
或:

```
yarn add d3 topojson
```
然后react中引入:
```
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import china from './china.json'; // 导入拓扑数据
```

同样，创建钩子:
```
const ChinaMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    // 创建地理投影
    const projection = d3
      .geoMercator()
      .center([105, 38])
      .scale(600)
      .translate([500, 500]);

    // 创建路径生成器
    const pathGenerator = d3.geoPath().projection(projection);

    // 渲染地图路径
    svgElement
      .selectAll('path')
      .data(china.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('stroke', '#333')
      .attr('fill', 'lightblue');
  }, []);

  return <svg ref={svgRef} width="1000" height="1000" />;
};
```

在这个例子中，我们首先使用 D3 的 `select` 方法选择 SVG 元素，并创建一个地理投影 `projection`，用于将地理坐标转换为屏幕坐标。
然后，我们创建一个路径生成器 `pathGenerator`，它将根据地理投影生成路径。

最后svg来渲染:
```
import React from 'react';
import ChinaMap from './ChinaMap';

const App = () => {
  return (
    <div className="App">
      <h1>China Map</h1>
      <ChinaMap />
    </div>
  );
};

export default App;
````


### 部署本项目
ubuntu 22.04 安装React node yarn 然后启动
1. 确保有 nvm
```
nvm --version
0.39.5
```
2. 使用nvm 安装
```
nvm install 20.5.0
```

切换：
```
nvm use 20.5.0
```

查看：
```
node -v
```

更新npm 与node匹配:
```
npm install -g npm@latest
```

查看：
```
npm -v
```

3.安装yarn:
```
sudo apt install yarn
```
如果出现：
```
node -v
v0.10.37
meiyi@meiyi-Extensa-2511G:~/workspace$ npx create-react-app my-app

/usr/share/nodejs/npm/bin/npx-cli.js:23
...removedSwitches,
^
SyntaxError: Unexpected token .
at Module._compile (module.js:439:25)
at Object.Module._extensions..js (module.js:474:10)
at Module.load (module.js:356:32)
at Function.Module._load (module.js:312:12)
at Function.Module.runMain (module.js:497:10)
at startup (node.js:119:16)
at node.js:935:3
```

可以清除缓存：
```
  运行sudo apt remove cmdtest命令，将已安装的"cmdtest"软件包卸载掉。
  运行sudo apt autoremove命令，删除不再需要的自动安装的软件包。
  运行sudo apt update命令，更新软件包列表。
  运行sudo apt install yarn命令，重新安装Yarn。
```
如果出现：
```

Setting up cmdtest (0.32.14.gcdfe14e-2) ...
Processing triggers for man-db (2.10.2-1) ...
meiyi@meiyi-Extensa-2511G:~/workspace/react_learn_for_d3_svg_path_20230912$ yarn -v
ERROR: There are no scenarios; must have at least one.
```
需要重新安装：
```
sudo apt install yarn
```
也可能是因为软件源问题：
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```
4.启动项目：
```
yarn start
```
