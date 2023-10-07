import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GridMapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 创建地图实例
    mapRef.current = L.map('map').setView([35.8617, 104.1954], 4);

    // 添加地图图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    return () => {
      // 清除地图实例
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default GridMapComponent;
