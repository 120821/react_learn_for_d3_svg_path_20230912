import React, { useState, useEffect, useRef } from 'react';
import ChinaMap from 'moment';
import * as d3 from 'd3';
import chinaGeoJson from 'china-geojson/src/geojson/china.json';

export default function ShowResultAsMap() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  useEffect(() => {
    const backgroundColor = 'blue';
    const svg = d3.select(svgRef.current);

    svg.style('background-color', backgroundColor);
    let isMounted = true;

    const width = 780;
    const height = 580;

    const projection = d3.geoMercator()
      .center([105, 38])
      .scale(600)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const features = JSON.parse(JSON.stringify(chinaGeoJson.features));
    const realData = [
      { province: '北京', emission: 500 },
      { province: '上海', emission: 200 },
      { province: '台湾', emission: 400 },
      { province: '青海', emission: 200 },
      { province: '辽宁', emission: 300 },
      { province: '黑龙江', emission: 100 },
    ];

    features.forEach((feature, i) => {
      // 在 realData 中查找对应省份的数据
      const provinceData = realData.find(data => data.province === feature.properties.name);
      // 如果找到对应省份的数据，则将真实的数量赋给 emission 属性
      if (provinceData) {
        feature.properties.emission = provinceData.emission;
      } else {
        feature.properties.emission = 0;
      }
    });
    console.log('== 省份数据:', features);

    svg.selectAll('*').remove();
    svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .call(projection);
    svg.selectAll('path')
      .data(features)
      .join('path')
      .attr('d', path)
      .transition()
      .attr('fill-opacity', 0.8)
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .attr('data-tip', (d, i) => { return d.properties.name + " : " + d.properties.emission; })
      .attr('fill', (d, i) => {
        const colorScale = d3.scaleSequential()
          .interpolator(d3.interpolateRgb('#ffffff', '#008000'))
          .domain([0, d3.max(features, d => d.properties.emission)]);

        return colorScale(d.properties.emission);
      });

    // 创建比色卡
    const legendWidth = 200;
    const legendHeight = 20;
    const legendPadding = 10;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - legendPadding},${height - legendHeight - legendPadding})`);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateRgb('#ffffff', '#008000'))
      .domain([0, d3.max(features, d => d.properties.emission)]);

    console.log('== 比色卡前，省份数据:', features);
    const legendXScale = d3.scaleLinear()
      .domain([0, d3.max(features, d => d.properties.emission)])
      .range([0, legendWidth]);
    // 根据需要设置刻度数量
    const legendXAxis = d3.axisBottom(legendXScale)
      .ticks(5);

    legend.append('g')
      .attr('class', 'legend-axis')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendXAxis);

    const legendGradient = legend.append('linearGradient')
      .attr('id', 'legend-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('x2', legendWidth)
      .selectAll('stop')
      .data(colorScale.ticks().map((t, i, n) => ({
        offset: `${100 * i / n.length}%`,
        color: colorScale(t)
      })))
      .join('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    legend.append('rect')
      .attr('x', 0)
      .attr('y', -legendHeight / 2)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#legend-gradient)');


  }, [data]);



  return (
    <div>
      <svg ref={svgRef} width="800" height="600"></svg>
      <div id="tooltip" style={{ display: 'none', position: 'absolute', backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', zIndex: '999' }}></div>
      {hoveredProvince && (
        <div id="tooltip" style={{ display: 'block', position: 'absolute', backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', zIndex: '999', left: '10px', top: '10px' }}>
          {hoveredProvince}
        </div>
      )}
    </div>
  );
}
