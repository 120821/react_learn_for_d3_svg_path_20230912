import React from 'react';
import GridLayout from 'react-grid-layout';

const PopulationGrid = ({ data }) => {
  // 指定网格布局的配置
  const layout = [
    { i: 'A', x: 0, y: 0, w: 2, h: 2 }, // 第一个省份的位置和大小
    { i: 'B', x: 2, y: 0, w: 2, h: 2 }, // 第二个省份的位置和大小
    // 添加更多省份的位置和大小...
  ];

  // 根据数据渲染网格项
  const renderGridItems = () => {
    return layout.map(item => {
      const { i, x, y, w, h } = item;
      const population = data[i]; // 假设数据中每个省份的人口数据以键值对的形式存储

      return (
        <div key={i} data-grid={{ x, y, w, h }}>
          <div>{i}</div>
          <div>{population}</div>
        </div>
      );
    });
  };

  return (
    <GridLayout className="layout" cols={4} rowHeight={100} width={800}>
      {renderGridItems()}
    </GridLayout>
  );
};

export default PopulationGrid;
