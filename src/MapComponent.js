import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MapComponent = ({ mapData, fill, stroke }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(mapRef.current);
    const width = 800;
    const height = 600;

    svg.selectAll('path')
      .attr('width', 1000)
      .attr('height', 1000)
       .attr('transform', `translate(${width / 2},${height / 2})`)
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('d', d3.geoPath())
      .attr('fill', fill)
      .attr('stroke', stroke);

  }, [mapData, fill, stroke]);

  return <svg ref={mapRef}  />;
};

export default MapComponent;
