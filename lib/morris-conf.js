class Morris1{
  constructor () {
    
  }
  auto=25; 
  hogar=25;
  comida=25;
  otros=25;
  total=25;
  setA(auto1, hogar1, comida1, otros1,total1) {
    auto=auto1; 
    hogar=hogar1;
    comida=comida1;
    otros=otros1;
    total=total1;
  }
}
const Morris2 = new Morris1()
var Script = function () {
    
    $(function () {

      Morris.Donut({
        element: 'hero-donut',
        data: [
          {label: 'Vehículo ', value: Morris2.auto },
          {label: 'Comida', value: Morris2.comida },
          {label: 'Hogar', value: Morris2.hogar },
          {label: 'Otros', value: Morris2.otros }
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




