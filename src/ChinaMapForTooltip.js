import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
//import chinaData from './china.json';
import chinaData from './china_map_new.json';

const ChinaMapForTooltip = () => {
  const mapRef = useRef();

  useEffect(() => {
    const svg = d3.select(mapRef.current);

    // 创建投影函数
    const projection = d3.geoMercator()
      .center([105, 38])
      .scale(600)
      .fitSize([800, 800], chinaData);

    // 创建路径生成器
    const path = d3.geoPath()
      .projection(projection);

    // 绘制地图路径
    svg.selectAll('path')
      .data(chinaData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.8)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // 处理鼠标悬停事件
    function handleMouseOver(event, d) {
      d3.select(this)
        .attr('fill', 'none');

      // 在工具提示中显示省份名称
      // 这里使用了示例的工具提示样式，你可以根据需要自定义样式
      svg.append('text')
        .attr('id', 'tooltip')
        .attr('x', event.pageX + 10)
        .attr('y', event.pageY - 10)
        .text(d.properties.name);
    }

    // 处理鼠标离开事件
    function handleMouseOut() {
      d3.select(this)
        .attr('fill', 'none');

      // 移除工具提示
      svg.select('#tooltip').remove();
    }
  }, []);

  return (
    <svg ref={mapRef} width={1000} height={500} />
  );
};

export default ChinaMapForTooltip;
