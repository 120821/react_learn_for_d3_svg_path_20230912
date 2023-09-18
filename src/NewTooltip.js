import React, { useEffect, useRef } from "react";
import { Tooltip } from "react-d3-tree";
import { Tree } from "react-d3-tree";
import * as d3 from "d3";
import ChinaGeoJson from 'china-geojson/src/geojson/china.json'; // 导入中国地图的拓扑数据
//constchinaGeoJson = require("./china.json"); // 导入中国地图的GeoJSON数据

const chinaGeoJson = require("china-geojson/src/geojson/china.json"); // 导入中国地图的GeoJSON数据
const NewTooltip = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const svg = d3.select(mapRef.current);

      // 设置地图的缩放级别和中心点
      const zoom = d3.zoom()
        .scale(1.5)
        .translate([50, 50])
        .on("zoom", function () {
          d3.select("body")
            .on("click", function() {
              console.log("You clicked somewhere!");
            });
        });

      svg.call(zoom);
    }
  }, []);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
      <Tree
        data={chinaGeoJson}
        tooltipContent={({ row }) => (
          <div>
            <h4>{row.name}</h4>
            <p>Population: {row.population}</p>
            <p>Area: {row.area}</p>
          </div>
        )}
        fill="lightblue"
        label="name"
        width={800}
        height={600}
      />
    </div>
  );
};

export default NewTooltip;
