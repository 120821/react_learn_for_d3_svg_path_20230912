import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
//import chinaData from './china_map_new.json';
import chinaData from './nanhai.json';

const ChinaMapBorder = () => {
  const mapRef = useRef();

  useEffect(() => {
    const svg = d3.select(mapRef.current);

    const projection = d3.geoMercator()
      .center([800, 10])
      .scale(700);

    const path = d3.geoPath()
      .projection(projection);

    svg.selectAll('path')
      .data(chinaData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', (d) => {
        // 判断是否为南海区域
        if (d.properties.name === '南海诸岛') {
          return 'white'; // 设置南海边框颜色
        }
        return 'none'; // 隐藏其他省份的边框
      })
      .attr('stroke-width', (d) => {
        // 判断是否为南海区域
        if (d.properties.name === '南海诸岛') {
          return 0.8; // 设置南海边框宽度
        }
        return 0; // 隐藏其他省份的边框
      });

  }, []);

  return (
    <div>
      <svg ref={mapRef} width={1200} height={340} />
    </div>
  );
};

export default ChinaMapBorder;
