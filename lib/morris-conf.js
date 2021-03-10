var Script = function () {

    $(function () {

      Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: 'Vehículos ', value: 25 },
          {label: 'Industria', value: 40 },
          {label: 'Hogares', value: 25 },
          {label: 'Otros', value: 10 }
        ],
          colors: ['#43a047', '#66bb6a ', '#2e7d32','#81c784 '],
        formatter: function (y) { return y + "%" }
      });


      Morris.Bar({
        element: 'hero-bar',
        data: [
          {device: 'Lunes', geekbench: 536},
          {device: 'Martes', geekbench: 137},
          {device: 'Miercoles', geekbench: 1275},
          {device: 'Jueves', geekbench: 380},
          {device: 'Viernes', geekbench: 655},
          {device: 'Sabado', geekbench: 1571},
          {device: 'Domingo', geekbench: 655}
        ],
        xkey: 'device',
        ykeys: ['geekbench'],
        labels: ['KG_CO2'],
        barRatio: 0.4,
        xLabelAngle: 35,
        hideHover: 'auto',
        barColors: ['#388e3c']
      });

    });

}();




