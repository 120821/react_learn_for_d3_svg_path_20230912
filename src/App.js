import './App.css';
import MyComponent from './MyComponent';
import MapComponent from './MapComponent';
import SomeMaps from './SomeMaps';
import ChinaMap from './ChinaMap';
import ToShowSomeMaps from './ToShowSomeMaps';
//import ColorCardMap from './ColorCardMap';
//import NewTooltip from './NewTooltip';
import chinaGeoJson from './china.json'; // 将路径替换为您的地图数据文件路径

function App() {
  const realData = [
    { province: '北京', emission: 500 },
    { province: '上海', emission: 200 },
    { province: '台湾', emission: 400 },
    { province: '青海', emission: 200 },
    { province: '辽宁', emission: 300 },
    { province: '黑龙江', emission: 100 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>map</p>
        <ToShowSomeMaps realData={realData}/>
        <p>map</p>
        <ToShowSomeMaps realData={realData}/>
        <p>map</p>
        <ToShowSomeMaps realData={realData}/>
        <p>map</p>
        <ToShowSomeMaps realData={realData}/>
        <p>map</p>
        <ToShowSomeMaps realData={realData}/>





        <MapComponent mapData={chinaGeoJson} fill="steelblue" stroke="white" />
        <MapComponent mapData={chinaGeoJson} fill="green" stroke="white" />
        <MapComponent mapData={chinaGeoJson} fill="orange" stroke="white" />
        <ChinaMap />
        <SomeMaps />
        <MyComponent />
      </header>
    </div>
  );
}

export default App;
