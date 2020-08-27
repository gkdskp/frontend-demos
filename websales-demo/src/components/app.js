import React, { useRef, useEffect } from "react"
import "../css/tailwind.css"
import "../App.css";
import {XYPlot, XAxis, YAxis, RadialChart, AreaSeries, HorizontalGridLines, LineMarkSeries} from 'react-vis';

function App() {
  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];
  return (
    <div className="app font-sans   flex w-full">
      <div className="fixed text-gray-600 text-center inset-x-0 left-0 w-2/12 h-full pt-10">
        <span className="font-bold text-2xl">websales</span>
        <ul className="mx-auto mt-10 text-left w-100">
          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 items-center flex px-5 py-3 my-5">
              <i className="w-10 fa fa-credit-card"></i>
              <span className="w-25">Payments</span> 
            </button>
          </li>
          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 flex px-5 items-center py-3 my-5">
              <i className="w-10 fa fa-book"></i>
              <span className="w-30">Transactions</span> 
            </button>
          </li>
          <li>
            <button className="mx-auto flex hover:bg-blue-700 items-center bg-indigo-800 rounded-full text-white  px-5 py-3 my-5 justify-start">
              <i className="w-10 h-full fa fa-chart-area"></i>
              <span className="w-25">Summary</span> 
            </button>
          </li>

          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 flex px-5 items-center py-3 my-5">
              <i className="w-10 fa fa-th-large"></i>
              <span className="w-25">Category</span> 
            </button>
          </li>
        </ul>
        <ul className="mx-auto mt-10 pt-10 text-left w-80" style={{
          borderTop: "1px solid #eeeeee"
        }}>
          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 items-center flex px-5 py-3 my-5">
              <i className="w-10 fa fa-cog"></i>
              <span className="w-20">Settings</span> 
            </button>
          </li>
          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 flex px-5 items-center py-3 my-5">
              <i className="w-10 fa fa-question-circle"></i>
              <span className="w-20">Help</span> 
            </button>
          </li>
          <li>
            <button className="mx-auto rounded-full hover:bg-gray-200 flex px-5 items-center py-3 my-5">
              <i className="w-10 fa fa-sign-out-alt fa-th-large"></i>
              <span className="w-20">Log Out</span> 
            </button>
          </li>
        </ul>
      </div>
      <div class="font-sans right-0 px-2 absolute w-10/12">
        <header class="flex-row flex z-50 h-16 w-100  items-center justify-between" style={{
          borderBottom: "2px solid #eee"
        }}>
          <div className="search">
            <i name="search-sharp" class="fa fa-search mr-3 text-gray-600"></i>
            <input placeholder="Search"
              className="border-transparent outline-none"
            />

          </div>
          <div className="actions-grp flex align-middle justify-center pr-10">
            <i name="notifications-sharp" class="text-2xl my-auto text-gray-600 bg-gray-100 fa fa-bell mr-5"></i>
            <button className="text-gray-600 bg-gray-100 hover:bg-gray-400 align-middle flex items-center justify-center pl-1 pr-4 rounded-full">
              <img
                src="data:image/jpeg;base64,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"
                className="w-10 rounded-full h-10 mr-2"
              />
              <span className="inline-block align-middle">John</span>
              <i class="h-100 fa fa-chevron-down ml-3 align-middle" name="chevron-down-sharp"></i>
            </button>
          </div>
        </header>

        <div id="main" class="w-100 pl-5 pr-10">
          <div className="flex align-middle w-100 items-center justify-between h-24">
            <span className="font-bold font-sans text-2xl">Sales Summary</span>
            <span className="right text-gray-600">
              Export report
              <button className="text-gray-600 bg-gray-100 ml-3 hover:bg-gray-400 py-1 pl-1 pr-1 rounded">
                <i name="" class="text-lg fa fa-cloud-download-alt"></i>
              </button>

            </span>
          </div>
          <div className="caption w-100 mt-2 items-start flex justify-between">
            <div className="left-data inline-block">
              <span className="text-gray-600">Showing for:</span>
              <i name="" class="px-2 mt-3 fa fa-calendar-alt"></i>
              1 April - 9 April 2020
              <i name="" class="px-2 mt-3 fa fa-chevron-down"></i>
            </div>
            <div className="right-btns inline-block mt-2">

              <button className="text-gray-600 bg-gray-100 py-1 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-blue-800" /> Sales
              </button>
              <button className="text-gray-600 bg-gray-100 py-1 px-3 rounded-full">

                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-yellow-700" /> Orders
              </button>
            </div>
          </div>

          <XYPlot className="mt-5"
                width={window.innerWidth*10/12 - 90}
                height={300}>
                  <YAxis title="X Axis" style={{
  line: {stroke: '#FFFFFF'},
  ticks: {stroke: '#FFFFFF'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
                <XAxis title="X Axis" style={{
  line: {stroke: '#FFFFFF'},
  ticks: {stroke: '#FFFFFF'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
                <HorizontalGridLines />
                <AreaSeries
                color="blue"
                fill="EEEEEE"
                opacity={0.4}
                  curve={'curveMonotoneX'}
                  data={[
                      {x: 0, y: 2.5},
                      {x: 1, y: 3.5},
                      {x: 2, y: 2},
                      {x: 4, y: 3.5},
                      {x: 5, y: 3},
                  ]}
                />
                <AreaSeries
                color="purple"
                fill="EEEEEE"
                opacity={0.4}
                    curve={'curveMonotoneX'}
                    data={[
                        {x: 0, y: 4},
                        {x: 3, y: 2},
                        {x: 4, y: 3},
                        {x: 5, y: 2},
                    ]}
                  />
            </XYPlot>
          
          <div className="flex justify-between mt-16 w-100 relative">
          <div className="pie-1 inline w-4/12">
            <span className="flex justify-between items-center">
              <span className="font-bold text-xl mb-5">
                Use by Device
            </span>
              <span className="buttons">
                <button className="text-gray-600 bg-gray-100 ml-3 hover:bg-gray-400 py-1 pl-1 pr-1 rounded">
                  <i name="" class="text-lg fa fa-cloud-download-alt"></i>

                </button>
                <button className="text-gray-600 bg-gray-100 ml-3 hover:bg-gray-400 py-1 pl-1 pr-1 rounded">
                  <i name="" class="text-lg fa fa-sliders-h"></i>

                </button>

              </span>
            </span>
            <span className="flex items-center">
            <RadialChart
 data={[{angle: 29, color: "2c5282"}, {angle: 64, color: "90cdf4"}, {angle: 7, color: "yellow"}]}
 width={window.innerWidth*2/12}
 height={300}
 innerRadius={50}
 radius={100}
 showLabels={true}
 labelsAboveChildren={false}
 colorType="literal"
 labelsStyle={{
   fontSize: 20,
   backgroundColor: "#ffffff",
   padding: "2px 2px",
   color: "#ffffff"
 }}
  />
    <span className="pl-10">
              <button className="text-gray-600 py-1 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-blue-300" /> Desktop
              </button><br/>
  <button className="text-gray-600 py-5 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-blue-800" /> Mobile
              </button><br/>
              <button className="text-gray-600 py-1 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block" style={{background: "yellow"}} /> Tablet
              </button><br/>
  </span></span>
          </div>
          <div className="pie-2 inline w-4/12">
            <span className="flex justify-between items-center">
              <span className="font-bold mb-5 text-xl">
                Audience
            </span>
              <span className="buttons">
                <button className="text-gray-600 bg-gray-100 ml-3 hover:bg-gray-400 py-1 pl-1 pr-1 rounded">
                  <i name="" class="text-lg fa fa-cloud-download-alt"></i>

                </button>
                <button className="text-gray-600 bg-gray-100 ml-3 hover:bg-gray-400 py-1 pl-1 pr-1 rounded">
                  <i name="" class="text-lg fa fa-sliders-h"></i>

                </button>

              </span>
            </span>
            <span className="flex items-center">
            <RadialChart
  data={[{angle: 5.6, color: "2c5282"}, {angle: 3.4, color: "90cdf4"}, {angle: 1.0, color: "yellow"}]}
  width={window.innerWidth*2/12}
  height={300}
  innerRadius={50}
  radius={100}
  showLabels={true}
  labelsAboveChildren={false}
  colorType="literal"
  labelsStyle={{
    backgroundColor: "red"
  }}
  /> 
  <span className="pl-10">
  <button className="text-gray-600 py-1 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-blue-800" /> Male
              </button><br/>
              <button className="text-gray-600 py-5 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block bg-blue-300" /> Female
              </button><br/>
              <button className="text-gray-600 py-1 px-3 mx-2 rounded-full">
                <span className="w-3 h-3 mr-2 rounded-full inline-block" style={{ background: "yellow"}} /> Other
              </button>
  </span>

            </span>
            
          </div>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default App
