import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MyComponent = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const pathGenerator = d3.path();
    pathGenerator.moveTo(50, 50);
    pathGenerator.lineTo(200, 50);
    pathGenerator.lineTo(200, 200);
    pathGenerator.closePath();

    const svgElement = d3.select(svgRef.current);
    svgElement.append('path').attr('d', pathGenerator.toString());
  }, []);

  return <svg ref={svgRef} width="250" height="250" />;
};

export default MyComponent;
