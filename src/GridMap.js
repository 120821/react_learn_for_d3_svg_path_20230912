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
      .scale(1800)
      .fitSize([300, 300], chinaData);
    const path = d3.geoPath().projection(projection);

    // 绘制地图路径
    svg.selectAll("path")
      .data(chinaData.features)
      .enter()
      .append("path")
      .attr("d", path)
      // 地图的border
      //.attr("stroke", "blue")
      //  背景色: 整个地图
      .attr("fill", "none");


    d3.csv(chinaPopulationData).then((csv_data) => {

      let areas = [];
      let population = [];

      // setup population
      csv_data.forEach((line, index) => {
        population.push(parseFloat(line['result_1990'])); // 修改这里，指定特定年份的数据
      });

      // 设置方块的颜色
      let linear = d3.scaleLinear().domain(d3.extent(population)).range(['white', 'red']); // 修改这里，指定颜色范围
      let tag_g = svg.append('g').attr('id', 'result_1990'); // 修改这里，指定特定年份的ID

      // 开始画每个小方块。每一度一个小块
      csv_data.forEach((line, index) => {
        // 平时都是false, 仅仅在出问题的时候，使用后面的 index >=3
        let is_debug = false; //index >= 3
        if (is_debug) {
          return;
        }
        let init_x = parseFloat(line.longitude);
        let init_y = parseFloat(line.latitude);

        let one_area = {
          type: "Polygon",
          coordinates: [
            [
              [init_x, init_y], [init_x, (init_y + 1)], [(init_x + 1), init_y + 1], [init_x + 1, init_y], [init_x, init_y]
            ]
          ]
        };
        //d3.select('#result_1990') // 修改这里，指定特定年份的ID
        let column_name = "result_1990"; // 修改这里，指定特定年份的列名

        let emission = line[column_name];
        tag_g.append("path")
          .attr("d", path(one_area))
          .attr('fill', linear(parseFloat(line[column_name])))
          .attr('opacity', 0.6);
      });
    });

  }, []);

  return (
    <svg ref={svgRef} width="100%" height="100%"></svg>
  );
};

export default GridMap;
