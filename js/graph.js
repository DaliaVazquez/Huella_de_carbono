
const graph1= new graph()
let b=graph1.getA();
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['auto', 2],
        ['hogar', 2],
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