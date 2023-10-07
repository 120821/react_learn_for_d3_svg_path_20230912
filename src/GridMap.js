import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import chinaData from "./china.json";
import chinaPopulationData from "./china_population.csv";

const GridMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 定义地理投影
    const projection = d3.geoMercator()
      .scale(800)
      .fitSize([300, 300], chinaData);
      //.fitSize([100, 100], chinaData);
    const path = d3.geoPath().projection(projection);

    // 绘制地图路径
    svg.selectAll("path")
      .data(chinaData.features)
      .enter()
      .append("path")
      .attr("d", path)
      // 地图的border
      .attr("stroke", "blue")
      //  背景色: 整个地图
      .attr("fill", "none");
    // 创建网格
    const grid = d3.geoGraticule();

    // 绘制网格路径
    svg.append("path")
      .datum(grid())
      .attr("d", path)
      .attr("stroke", "#ddd")
      .attr("fill", "none");

  }, []);

  return (
    <svg ref={svgRef} width={500} height={500}></svg>

  );
};

export default GridMap;
