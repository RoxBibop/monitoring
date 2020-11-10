console.log("Bonjour");

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

var i = 0;
var cpuValues = [];
var labels = [];

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'CPU usage',
        data: cpuValues,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio : false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display : false
      }
    }
});


ipcRenderer.on('cpu',(event,data) => {
  document.getElementById('cpuVal').innerHTML = "  " + data.toFixed(2) + "%";
  cpuValues.push(data.toFixed(2));
  labels.push (i++);

  if ( labels.length > 20 ) {
    labels = labels.slice(Math.max(labels.length - 20, 1))
    myChart.data.labels = labels;
  }

  if ( cpuValues.length > 20 ) {
    cpuValues = cpuValues.slice(Math.max(labels.length - 20, 1))
    myChart.data.datasets[0].data = cpuValues
  }

  myChart.update();
});

ipcRenderer.on('mem',(event,data) => {
  document.getElementById('mem').innerHTML = data.toFixed(2);
});

ipcRenderer.on('total-mem',(event,data) => {
  document.getElementById('total-mem').innerHTML = data.toFixed(2);
});

ipcRenderer.on('platform',(event,data) => {
  document.getElementById('platform').innerHTML = data;
});



