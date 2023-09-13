import './App.css';
import MyComponent from './MyComponent';
import ChinaMap from './ChinaMap';
import TooltipMap from './TooltipMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TooltipMap />
        <ChinaMap />
        <MyComponent />
      </header>
    </div>
  );
}

export default App;
