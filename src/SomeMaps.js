import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import chinaGeoJson from './china.json'; // 将路径替换为您的地图数据文件路径

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(mapRef.current);

    // 循环处理3个中国地图
    for (let i = 0; i < 3; i++) {
      const mapData = chinaGeoJson; // 可根据需要设置不同的地图数据

      svg.append('path')
        .datum(mapData)
        .attr('d', d3.geoPath())
        .attr('fill', 'steelblue')
        .attr('stroke', 'white');
    }
  }, []);

  return (
    <svg ref={mapRef} width={800} height={600} />
  );
};

export default MapComponent;
