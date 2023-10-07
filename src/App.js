import './App.css';
import MyComponent from './MyComponent';
import MapComponent from './MapComponent';
import SomeMaps from './SomeMaps';
import RerenderExample from './RerenderExample';
import ChinaMap from './ChinaMap';
import GridData from './GridData';
import ToShowSomeMaps from './ToShowSomeMaps';

//import PopulationGrid from './PopulationGrid';
//import PopulationGridColor from './PopulationGridColor';
import GridMap from './GridMap';
import GridMapComponent from './GridMapComponent';

//import ColorCardMap from './ColorCardMap';
//import NewTooltip from './NewTooltip';
import chinaGeoJson from './china.json'; // 将路径替换为您的地图数据文件路径

//<PopulationGrid data={populationData} />
//<PopulationGridColor data={populationData} />
function App() {
  const realData = [
    { province: '北京', emission: 500 },
    { province: '上海', emission: 200 },
    { province: '台湾', emission: 400 },
    { province: '青海', emission: 200 },
    { province: '辽宁', emission: 300 },
    { province: '黑龙江', emission: 100 },
  ];

  //const populationData = {
  //  A: 1000000, // 第一个省份的人口数据
  //  B: 2000000, // 第二个省份的人口数据
  //  // 更多省份的人口数据...
  //};

  return (
    <div className="App">
      <header className="App-header">

        <GridMapComponent />
        <GridMap />

        <RerenderExample />
        <p>map</p>
        <GridData />
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
