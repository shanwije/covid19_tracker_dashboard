import React, {useEffect, useState} from 'react';
import '../../App.css';
import usePersistedState from "../hooks/usePersistantStateHook";
import {getDeathsPerDateGraphData,getPatientsPerDateGraphData} from "./dashboardRepository";
import _ from 'lodash';
import { Chart } from "react-google-charts";

function DashboardView() {

const [deathsPerDateGraphData, setDeathsPerDateGraphData] = usePersistedState('DEATHS_PER_DATE_GRAPH_DATA', []);
const [patientsPerDateGraphData, setPatientsPerDateGraphData] = usePersistedState('PATIENTS_PER_DATE_GRAPH_DATA', []);
const [error, setError] = useState({});

useEffect(() => {
const fetchData = async () =>{
try {
    setError({});
    const deathsPerDateGraphData =  _.get(await getDeathsPerDateGraphData(), 'data.data', []);
    const patientsPerDateGraphData  =    _.get(await getPatientsPerDateGraphData(), 'data.data', []);

    setData(deathsPerDateGraphData, patientsPerDateGraphData);
} catch (error) {
    setError({error: true, message : error.message || 'Unexpected error occurred'})
}

};
fetchData();
}, []);
const setData = (deathsPerDateGraphData, patientsPerDateGraphData) => {
    setDeathsPerDateGraphData(deathsPerDateGraphData);
    setPatientsPerDateGraphData(patientsPerDateGraphData);
};

  return (
    <div className="App">
        {error.error && <div className={"error-div"}>{error.message}</div>
        }


      <div className="body">
        <h1 className="main-header">Sri Lanka Covid 19 current status</h1>
          <div className="App-header">
              {/*{JSON.stringify(deathsPerDateGraphData)}*/}
          </div>


          {deathsPerDateGraphData && <Chart
          width={'100%'}
          height={'600px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={
          [
          ['Deaths', 'Time'],
           ...deathsPerDateGraphData.map(record=>[new Date(record.date).toDateString(), record.total_deaths,]),
           ]
           }
          options={{
              title: "Deaths",
              curveType: "function",
              legend: { position: "bottom" }
          }}
      />}

          {patientsPerDateGraphData && <Chart
              width={'100%'}
              height={'600px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={
                  [
                      ['Patients', 'Time'],
                      ...patientsPerDateGraphData.map(record=>[new Date(record.date).toDateString(), record.total_cases,]),
                  ]
              }
              options={{
                  title: "Total patients",
                  curveType: "function",
                  legend: { position: "bottom" }
              }}
          />}
      </div>
    </div>
  );
}

export default DashboardView;
