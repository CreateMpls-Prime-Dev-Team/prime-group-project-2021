import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import './Dashboard.css'
import { Pie, Line, Bar } from 'react-chartjs-2';
import { height } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import AdminViewConfig from './AdminViewConfig';

function Dashboard() {

  const dispatch = useDispatch();
  const { 
    ethnicity, 
    gender, 
    minutesByMonth,
    occurrenceGrid,
    studentGrid,
    teacherGrid 
  } = useSelector(store => store.charts);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_DASHBOARD'});
  }, [])

  const ethnicityPieGraph = () => {
    const ethnicityNames = ethnicity.map( (e) => e.name );
    const ethnicityTotals = ethnicity.map( (e) => e.total );

    const ethnicityData = {
      labels: ethnicityNames,
      datasets: [
        {
          label: 'Ethnicity Data',
          data: ethnicityTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return <Pie id = "ethnicityPie" data={ethnicityData} />
  }
  
  const genderPieGraph = () => {
    const genderNames = gender.map( (g) => g.name );
    const genderTotals = gender.map( (g) => g.total );
    const genderData = {
      labels: genderNames,
      datasets: [
        {
          label: 'Gender Data',
          data: genderTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return <Pie id = "genderPie" data={genderData} />
  }

    const minutesByMonthLineGraph = () => {
      let totalMonths = 12; // Twelve months a year on earth.
      let recordIndex = 0; // Need to start the process somewhere, 
      let monthlyMinutes = [] // Payload for sending data to graph
      
      //Cycle through each month
      for (let month = 1; month <= totalMonths; month++) {
        //Check if there is a record to compare, and check if the month number matches
        if (minutesByMonth[recordIndex] && minutesByMonth[recordIndex].month_number === month){
          //If so push info to array and increment the array index
          monthlyMinutes.push(minutesByMonth[recordIndex].total_minutes);
          recordIndex++;
        } else {
          //If no record is found push 0 minutes
          monthlyMinutes.push(0);
        }
      }

      const enrollmentData = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: 'Student Total Minutes by Month',
            data: monthlyMinutes,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const barOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      return <Line id ="studentEnrollment" data={enrollmentData} options={barOptions} style={{width: "20em", height: "100em"}} />
    }   

    const occurrenceDataGrid = () => {

      const columns = [
        { field: 'date', headerName: 'Date', width: 175 },
        { field: 'program_name', headerName: 'Name', width: 170 },
        { field: 'program_location', headerName: 'Location', width: 175 },
        { field: 'teacher_first_name', headerName: 'First Name', width: 100 },
        { field: 'teacher_last_name', headerName: 'Last Name', width: 100 },
        { field: 'duration', headerName: 'Duration', width: 75 },
        { field: 'volunteers', headerName: 'Volunteers', width: 75 },
        { field: 'student_count', headerName: 'Student Count', width: 75 },
      ];
      return (
        <div style={{ height: 500, width: '90%' }}>
          <DataGrid  
            rows={occurrenceGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    }
      
    const studentDataGrid = () => {

      const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 175 },
        { field: 'first_name', headerName: 'First Name', width: 175 },
        { field: 'ethnicity', headerName: 'Ethnicity', width: 175 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'grade', headerName: 'Grade', width: 100 },
        { field: 'total_minutes', headerName: 'Total Minutes', width: 200 },
      ];
      return (
        <div style={{ height: 500, width: '90%' }}>
          <DataGrid  
            rows={studentGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    }

    const teacherDataGrid = () => {

      const columns = [
        { field: 'last_name', headerName: 'Last Name', width: 200 },
        { field: 'first_name', headerName: 'First Name', width: 200 },
        { field: 'total_minutes', headerName: 'Total Minutes', width: 200 },
      ];
      return (
        <div style={{ height: 300, width: '90%' }}>
          <DataGrid  
            rows={teacherGrid} 
            columns={columns} 
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>)
    }

      // const locationdata = {
      //   labels: ['Minneapolis', 'St. Paul', 'Suburbs', 'Anoka', 'Hopkins', 'Minnetonka'],
      //   datasets: [
      //     {
      //       label: 'Learning Lab',
      //       data: [12, 19, 3, 5, 2, 3],
      //       backgroundColor: 'rgb(255, 99, 132)',
      //     },
      //     {
      //       label: 'Robot League',
      //       data: [2, 3, 20, 5, 1, 4],
      //       backgroundColor: 'rgb(54, 162, 235)',
      //     },
      //     {
      //       label: 'Coding Class Bro',
      //       data: [3, 10, 13, 15, 22, 30],
      //       backgroundColor: 'rgb(75, 192, 192)',
      //     },
      //   ],
      // };
      
      // const stackbaroptions = {
      //   scales: {
      //     yAxes: [
      //       {
      //         stacked: true,
      //         ticks: {
      //           beginAtZero: true,
      //         },
      //       },
      //     ],
      //     xAxes: [
      //       {
      //         stacked: true,
      //       },
      //     ],
      //   },
      // };
      


return(  
  <>
  <center>
    <div id = "flex-chart-container" style={{justifyContent: 'center'}}>
        <div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">ETHNICITY</Typography>
        {ethnicity && ethnicityPieGraph()}
        
        </div>

        <div div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">GENDER</Typography>
        {gender && genderPieGraph()}
        </div>

        <div div class ="flex-child" style={{width: "20em", height: "20em", margin: 10}}>
        <Typography variant="h6">TOTAL MINUTES PER MONTH</Typography>
        {minutesByMonth && minutesByMonthLineGraph()}
        </div>

        
        {/* <div div class ="flex-child" >
        <h4>Enrollment by Location </h4>
        <Bar data={locationdata} options={stackbaroptions} />
        </div> */}

    </div>
    <div style={{ height: 500, width: '80%', marginTop: 100 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>RECENT PROGRAMS</Typography>
      {occurrenceGrid && occurrenceDataGrid()}
    </div>
    <div style={{ height: 500, width: '80%', marginTop: 125 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>STUDENT ATTENDANCE</Typography>
      {studentGrid && studentDataGrid()}
    </div>
    <div style={{ height: 300, width: '80%', marginTop: 125, marginBottom: 125 }}>
      <Typography variant="h5" sx={{ marginBottom: 5}}>STAFF ATTENDANCE</Typography>
      {teacherGrid && teacherDataGrid()}
    </div>
    <div>
        <AdminViewConfig />
    </div>
  </center>
  </>
);


  
    // <p>Enrollment by Location Bar Chart</p>


}

export default Dashboard;