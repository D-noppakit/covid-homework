import React, { useState, useEffect } from "react";
import useSwr from "swr";
import Link from "next/link";
import Chart from "chart.js";
import { HorizontalBar } from "react-chartjs-2";
import * as _ from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  useEffect(() => {
    console.log(cases);
    

  }, []);
  const conuntry = [];
  const cases = [];

  const { data, error } = useSwr(
    "https://disease.sh/v3/covid-19/historical?lastdays=all",
    fetcher
  );
  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);
  _.sortedIndexBy(cases, { "1/22/20": 4 }, "1/22/20");

  console.log(cases);

  for (let i = 0; i < data["length"]; i++) {
    let province = "";
    if (data[i].province == null) {
      province = " ";
    } else {
      province = " " + data[i].province;
    }
    conuntry[conuntry.length] = data[i].country + province;
    cases[cases.length] = data[i].timeline.cases["4/1/20"];

  }
  const dataSet = [];
  for (let j = 0; j < conuntry.length; j++) {
    dataSet[0] = conuntry[j];
  }
  console.log(dataSet);
  // console.log(cases);
  // let country =['a','b','c']
  // let cases =[100,200,300]
  const dataChart = {
    labels: conuntry,
    datasets: [
      {
        label: "cases",
        data: cases,
        fill: true, // Don't fill area under the line
        backgroundColor: "green",
        borderColor: "green", // Line color
      },
    ],
  };
  let m = 4;
  let d = 1;
  let y = 20;
  for (let i = 0; i < 20; i++) {
    let date = m.toString() + "/" + d.toString() + "/" + y.toString();
    d = d + 1;
    console.log(date);
    for (let j = 0; j < data["length"]; j++) {
      cases[j] = data[j].timeline.cases[date];
      
    }
    console.log(cases);
  }

  const options = {
    maintainAspectRatio: false, // Don't maintain w/h ratio
    animation: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };

  return (
    <>
    <HorizontalBar data={dataChart} options={options} height={1500} />
    
    <button >animation</button>
    </>
  );
}
