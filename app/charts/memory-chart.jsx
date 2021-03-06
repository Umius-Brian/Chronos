import React, { useContext } from 'react';
import HealthContext from '../context/DetailsContext';
import Plot from 'react-plotly.js';

const MemoryChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const free = [];
    const used = [];
    const active = [];
    const total = [];

    for (let i = 0; i < healthData.length; i += 1) {
      xAxis.push(i);
      // If Mongo
      if (healthData[i].currentMicroservice === props.service) {
        free.push(healthData[i].freeMemory);
        active.push(healthData[i].activeMemory);
        used.push(healthData[i].usedMemory);
        total.push(healthData[i].totalMemory);
      }

      // If SQL
      if (healthData[i].currentmicroservice === props.service) {
        free.push(healthData[i].freememory);
        active.push(healthData[i].activememory);
        used.push(healthData[i].usedmemory);
        total.push(healthData[i].totalmemory);
      }
    }

    return (
      <Plot
        data = {[
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgb(14, 49, 80)',
            mode: 'none',
            x: {autorange: true},
            y: free,
            name: 'Free Memory',
            rangemode: 'nonnegative'
          },
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(255, 64, 87, .3)',
            mode: 'none',
            x: {autorange: true},
            y: used,
            name: 'Used Memory',
            rangemode: 'nonnegative'
          },
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(144, 0, 72, .4)',
            mode: 'none',
            x: {autorange: true},
            y: active,
            name: 'Active Memory',
            rangemode: 'nonnegative'
          },
          {label: xAxis},
        ]}
        layout = {{
          width: 400,
          height: 400,
          paper_bgcolor: '#fffbe0',
          plot_bgcolor: '#fffbe0',
          legend: {
            itemsizing: 'constant',
            orientation: 'h',
            xanchor: 'center',
            x: .5
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 100,
          },
        }}
      />
    )
  };

  return <div>{createChart()}</div>;
};

export default MemoryChart;
