import React, { useRef } from 'react';
import * as d3 from 'd3';
//import { geoJson } from 'd3-geo';  // 修改这里的导入语句
import chinaJson from 'china-geojson/src/geojson/china.json';  // 导入中国地图数据

const TooltipMap = () => {
  const svgRef = useRef(null);

  // 创建地图和Tooltip
  // 创建SVG元素
  const svg = d3.select(svgRef.current);

  // 创建投影
  const projection = d3.geoMercator().fitSize([500, 500], chinaJson);

  // 创建路径生成器
  const path = d3.geoPath().projection(projection);

  // 渲染地图路径
  svg.append('g').selectAll('path').data(chinaJson.features).enter().append('path').attr('d', path).style('fill', 'lightgray');

  // 创建Tooltip
  const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

  // 鼠标悬停在地图上时的操作
  svg.on('mouseover', function(event, d) {
    tooltip.transition().duration(200).style('opacity', 1);
    tooltip.html(d.properties.name + '<br/>' + d.properties.value) // 根据实际情况修改Tooltip的显示内容
      .style('left', event.pageX + 'px') // 根据实际情况修改Tooltip的位置
      .style('top', event.pageY + 'px');
  });

  // 鼠标离开地图时的操作
  svg.on('mouseout', function(event, d) {
    tooltip.transition().duration(500).style('opacity', 0);
  });

  return (
    <svg ref={svgRef} width="500" height="500"></svg>
  );
};

export default TooltipMap;

