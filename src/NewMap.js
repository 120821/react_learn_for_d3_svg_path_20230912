import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import chinaData from "./china.json";

const NewMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 定义地图投影
    const projection = d3.geoMercator()
      .center([104, 37.5])  // 地图中心位置（经度和纬度）
      .scale(800)  // 缩放比例
      .translate([400, 300]);  // 平移

    // 创建路径生成器
    const path = d3.geoPath().projection(projection);

    // 加载中国地图数据
    d3.json('/china.topojson').then((data) => {
      // 转换拓扑数据为GeoJSON格式
      const geojson = topojson.feature(data, data.objects.china);

      // 绘制地图路径
      svg.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', '#000')
        .style('stroke-width', '0.5')
        .style('fill', '#ccc');
    });
  }, []);

  return (
    <svg ref={svgRef} width="800" height="600" />
  );
};

export default NewMap;
