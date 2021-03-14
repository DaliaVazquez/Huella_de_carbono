class graph{
    constructor () {
    }
    auto=25; 
    hogar=25;
    comida=25;
    otros=25;
    total=25;
    getA() {
        const post= new post()
      auto=auto1; 
      hogar=hogar1;
      comida=comida1;
      otros=otros1;
      total=total1;
    }

    
    
}
const graph1= new graph()
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['auto', graph1.auto],
        ['hogar',      2],
        ['comida',  2],
        ['otros', 2],
    ]);

    var options = {
        pieHole: 0.5,
        pieSliceTextStyle: {
            color: 'lightyellow',
        },
        legend: 'none',
        backgroundColor: 'none',
        chartArea:{left:0,top:0,width:'100%',height:'100%'},
        height: '350',
        colors:['green','#004411']
    };


    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
 
function getValueAt(column, dataTable, row) {
    return dataTable.getFormattedValue(row, column);
}