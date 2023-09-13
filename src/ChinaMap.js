import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import china from './china.json';

const ChinaMap = () => {
  const svgRef = useRef(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

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
      .attr('fill', 'lightblue')
      .on('mouseover', (d) => {
        d3.select(d.currentTarget).attr('fill', 'orange');
      })
      .on('mouseout', (d) => {
        d3.select(d.currentTarget).attr('fill', 'lightblue');
      })
      .on('click', (d) => {
        setSelectedProvince(d.properties.name);
      });

    // 缩放和平移功能
    const zoomHandler = d3.zoom().on('zoom', () => {
      svgElement.attr('transform', d.transform);
    });

    svgElement.call(zoomHandler);

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
