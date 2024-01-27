// @ts-nocheck

import React from 'react';

import { Chart } from 'primereact/chart';

export const  TauxEchange = React.memo(({chartData , chartOptions}) : JSX.Element =>{
  console.log("graphe de taux d'échange")
  return (
    // <div className="">
        <Chart 
        // height='3800'
        type="bar" 
        pt={{
          canvas : {
            className: "flex-1 "
            
          } , 
          root : {
            className : "flex-1"
          }

        }}
        data={chartData} 
        options={chartOptions} 
        
    />
    // </div>
  )
})
