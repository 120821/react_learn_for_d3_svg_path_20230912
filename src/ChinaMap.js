import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import chinaGeoJson from 'china-geojson/src/geojson/china.json';

const ChinaMap = () => {
  const svgRef = useRef(null);
  const [selectedProvince ] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 设置地图的宽度和高度
    const width = 800;
    const height = 600;

    // 创建一个地理投影
    const projection = d3.geoMercator()
    // 设置地图的中心位置
      .center([105, 38])
    // 设置地图的缩放比例
      .scale(600)
    // 将地图移动到 SVG 的中心
      .translate([width / 2, height / 2]);

    // 创建一个路径生成器
    const path = d3.geoPath().projection(projection);
    const features = JSON.parse(JSON.stringify(chinaGeoJson.features));
    features.forEach((feature) => {
      feature._entering = true;
    });

    svg.selectAll('*').remove();
    svg.append('g')
       .attr('transform', `translate(${width / 2},${height / 2})`)
       .call(projection);
    svg.selectAll('path')
      .data(features)
      .join('path')
      .attr('d', path)
      //.attr('fill', (d) => (d._entering ? 'steelblue' : 'tomato'))
      //.transition()
      //.attr('fill-opacity', 0.8)
      //// 添加边框样式
      //// 边框颜色
      //.style('stroke', 'black')
      //// 边框宽度
      //.style('stroke-width', '1px');

      .transition()
      .attr('fill-opacity', 0.8)
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .attr('fill', (d, i) => {
        // 根据省份的索引（i）设置不同的颜色
        // 这里可以自定义颜色映射
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        return colors[i % colors.length];
      });
  }, []);

  return (
    <div>
      <h1>China Map</h1>
      {selectedProvince && <p>Selected Province: {selectedProvince}</p>}
      <svg ref={svgRef} width="1000" height="1000" />
    </div>
  );
};

export default ChinaMap;
