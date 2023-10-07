import React from 'react';
import GridLayout from 'react-grid-layout';

const PopulationGridColor = ({ data }) => {
  const layout = [
    { i: 'A', x: 0, y: 0, w: 2, h: 2 },
    { i: 'B', x: 2, y: 0, w: 2, h: 2 },
    // 添加更多省份的位置和大小...
  ];

  // 定义人口数据范围和对应的颜色
  const colorScale = {
    low: '#f2f2f2', // 低人口范围的颜色
    medium: '#66b3ff', // 中等人口范围的颜色
    high: '#003366', // 高人口范围的颜色
  };

  // 根据人口数据获取对应的背景颜色
  const getBackgroundColor = (population) => {
    if (population < 1000000) {
      return colorScale.low;
    } else if (population < 5000000) {
      return colorScale.medium;
    } else {
      return colorScale.high;
    }
  };

  const renderGridItems = () => {
    return layout.map((item) => {
      const { i, x, y, w, h } = item;
      const population = data[i];

      const gridItemStyle = {
        backgroundColor: getBackgroundColor(population),
      };

      return (
        <div key={i} data-grid={{ x, y, w, h }} style={gridItemStyle}>
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

export default PopulationGridColor;
