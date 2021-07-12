import {Line} from 'react-chartjs-2';

const state = {
  labels: ['Mon', 'Tues', 'Wed',
           'Thurs', 'Fri','Sat','Sun'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(75,192,192,1)',
      lineTension: 0.5,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10, 15, 5, 7, 10,20,25]
    }
  ]
}

export default function LineGraph() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Daily Sales',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
}