import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import 'd3-tip';
import './TooltipMap.css'; // 导入CSS样式表

const TooltipMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 设置地理投影
    const projection = d3
      .geoMercator()
      .center([104, 37.5]) // 地图的中心位置
      .scale(600) // 缩放比例
      .translate([300, 200]); // 平移

    // 创建一个路径生成器
    const path = d3.geoPath().projection(projection);

    // 添加tooltip
    const tooltip = d3.tip().attr('class', 'd3-tip').html((d) => d.name);
    svg.call(tooltip);

    // 读取中国地图的拓扑数据
    d3.json('/path/to/china.json').then((data) => {
      // 渲染地图路径
      svg
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('stroke', '#000')
        .attr('fill', '#ccc')
        .on('mouseover', (event, d) => {
          tooltip.show(d, event.target);
        })
        .on('mouseout', tooltip.hide);
    });
  }, []);

  return (
    <svg ref={svgRef} width={600} height={400}>
      <g>
        {data.features.map((feature, index) => (
          <path
            key={index}
            d={path(feature)}
            stroke="#000"
            fill="#ccc"
          />
        ))}
      </g>
    </svg>
  );
};

export default TooltipMap;
