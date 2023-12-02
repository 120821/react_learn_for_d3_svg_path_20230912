import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import chinaData from './china_map_new.json';

const ChinaMapForFillColor = () => {
  const mapRef = useRef();
  const [provinceColors, setProvinceColors] = useState({});

  useEffect(() => {
    const svg = d3.select(mapRef.current);

    // 创建投影函数和路径生成器
    const projection = d3.geoMercator().scale(100);
    const path = d3.geoPath().projection(projection);

    // 创建颜色比例尺
    const colorScale = d3.scaleSequential();
      //.interpolator(d3.interpolateBlues)
      //.domain([0, 100]); // 根据实际需求设置颜色映射范围
      //.interpolator(d3.interpolateGreens) // 修改为绿色渐变
      //.domain([0, 100]); // 根据实际需求设置颜色映射范围

    // 生成随机的 emission 值
    const generateRandomEmission = () => {
      const minEmission = 0; // 最小 emission 值
      const maxEmission = 100; // 最大 emission 值
      return Math.random() * (maxEmission - minEmission) + minEmission;
    };

    // 生成省份颜色的映射关系
    const generateProvinceColors = () => {
      const colors = {};
      chinaData.features.forEach((feature) => {
        const provinceName = feature.properties.name;
        const emission = generateRandomEmission();
        const color = colorScale(emission);
        colors[provinceName] = color;
      });
      return colors;
    };

    // 更新省份颜色映射关系的状态变量
    setProvinceColors(generateProvinceColors());

    // 绘制地图路径
    svg.selectAll('path')
      .data(chinaData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', (d) => provinceColors[d.properties.name])
      .attr('stroke', 'white')
      .attr('stroke-width', 0.8)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // 处理鼠标悬停事件
    function handleMouseOver(event, d) {
      //d3.select(this).attr('fill', 'none');

      // 在工具提示中显示省份名称
      svg.append('text')
        .attr('id', 'tooltip')
        .attr('x', event.pageX - 80)
        .attr('y', event.pageY - 180)
        .text(d.properties.name)
        .style('fill', 'white');
    }

    // 处理鼠标离开事件
    function handleMouseOut() {
      //d3.select(this).attr('fill', 'none');
      svg.select('#tooltip').remove();
    }
  }, []);

  //return <svg ref={mapRef} width={1500} height={1000} style={{ background: 'pink' }} />;
  //return <svg ref={mapRef} width={1500} height={1000} />;
  //style={{
  //  background: 'linear-gradient(to bottom, #00aaff, #0055ff)',
  //}}
  return (
    <svg
    ref={mapRef}
    width={1500}
    height={1000}
    />
  );
};

export default ChinaMapForFillColor;
