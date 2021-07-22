import { Line, Bar } from 'react-chartjs-2';
import apiClient from '../../services/apiClient';
import { useEffect, useState } from "react";

export default function LineGraph({ range, dateRange, start }) {
  const [data, setData] = useState([])
  const days = {
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thurs',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun'
  }

  const months = {
    "Jan": '01',
    "Feb": '02',
    "Mar": '03',
    "Apr": '04',
    "May": '05',
    "Jun": '06',
    "Jul": '07',
    "Aug": '08',
    "Sep": '09',
    "Oct": '10',
    "Nov": '11',
    "Dec": '12'
  }


  useEffect(() => {
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    function getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        let date = new Date(currentDate)
        date = date.toString()
        let dateFormat = date.slice(11, 15) + '-' + months[date.slice(4, 7)] + '-' + date.slice(8, 10)
        dateArray.push(dateFormat);
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }

    const dateArray = getDates(dateRange[0].startDate, dateRange[0].endDate)

    const handleOnSubmit = async (startDate) => {

      const { data, error } = await apiClient.getWeeklyOrders(
        {
          start_date: startDate
        })
      return data
    }
    const forLoop = async () => {
      setData(await Promise.all(dateArray.map((date) => handleOnSubmit(date))))
    }
    forLoop()

  }, [dateRange])

  let more = []
  for (let i =0; i<data.length;i++){
    more.push(data[i]['orders'])
  }

  
  let labels =[]
  if (range>7){
    start = start.getUTCDate()
    for(let i =0;i<range;i++){
      labels.push(start)
      start+=1
    }
  }else{
    start = start.getUTCDay()
    for(let i =0;i<range;i++){
      labels.push(days[start])
      start+=1
      if (start>7){
        start =1
      }
    }
  }


  const state = {
    labels: (labels),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75,192,192,1)',
        lineTension: 0.5,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: more
      }
    ]
  }
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: 'Daily Sales',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  );
}