import React, { useEffect } from 'react';
import * as d3 from 'd3';
import mapGeoJson from './china_map_new.json';
function DrawChinaMapBorderOnly({ mapGeoJson, svg, path }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await d3.json(mapGeoJson);
      const geojson = response;

      let chinaMapTag = svg.append('g').attr('id', 'china_map_border');

      let linear = d3.scaleLinear().domain([0, geojson.features.length]).range(['red', 'blue']);

      geojson.features.forEach((e, i) => {
        chinaMapTag
          .append('path')
          .attr('d', path(e))
          .attr('fill', 'transparent')
          .attr('stroke', 'red')
          .attr('stroke-width', 0.3)
          .style('pointer-events', 'none');
      });
    };

    fetchData();
  }, [mapGeoJson, svg, path]);

  return null;
}

export default DrawChinaMapBorderOnly;
