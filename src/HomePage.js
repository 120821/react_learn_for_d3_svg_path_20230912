import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HomePage = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    // D3 路径生成器和操作...
    // ...

    return () => {
      // 在组件卸载时清理操作（可选）
      // ...
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <svg ref={svgRef} width="250" height="250" />
    </div>
  );
};

export default HomePage;
