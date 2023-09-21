import React from 'react';

function GridComponent({ data }) {
  return (
    <div className="grid">
      {data.map(item => (
        <div key={item.id} className="grid-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const gridData = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description for Item 1',
      image: 'item1.jpg'
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description for Item 2',
      image: 'item2.jpg'
    },
    // 更多数据项...
  ];

  return (
    <div>
      <h1>Grid Example</h1>
      <GridComponent data={gridData} />
    </div>
  );
}

export default App;
