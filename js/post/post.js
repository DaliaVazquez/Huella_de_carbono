class Post {
  constructor () {
    this.db = firebase.firestore();
    const settings = {timestampsInSnapshots : true}
    this.db.settings(settings)

  }

  
  
  crearEntrada (uid, emailUser, auto, hogar, comida, otros,total) {
    
    return this.db
      .collection('entradas')
      .add({
        uid: uid,
        autor: emailUser,
        auto: parseInt(auto),
        hogar: parseInt(hogar),
        comida: parseInt(comida),
        otros: parseInt(otros),
        total: parseInt(total),
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log(`Id de la entrada => ${refDoc.id}`)
      })
      .catch(error => {
        console.error(`Error creando la entrada => ${error}`)
      })
  }

  consultarTodosPost (emailUser) {
      
      this.db.collection('entradas')
      .orderBy('fecha', 'desc')
      .get()
      .then(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts').append(this.obtenerPostSemana())
      } else {
        let postHtml = [0,0,0,0,0,0,0];
        let postHtml2 = ["day","day","day","day","day","day","day"];
        let n=0;
        let dia="";
        querySnapshot.forEach(post => {
          if(emailUser== post.data().autor && n<7 && dia != Utilidad.obtenerFecha(post.data().fecha.toDate())){
            console.log(`allPosts con Limit 2 => ${post .data().auto}`)
            postHtml[n] = post.data().total;
            postHtml2[n] = Utilidad.obtenerFecha(post.data().fecha.toDate());
            dia=Utilidad.obtenerFecha(post.data().fecha.toDate());
            n++;
          }
          
        })
        $('#posts').append(this.obtenerPostSemana(postHtml,postHtml2))
      }
    })
  }
  
  
  consultarDia (emailUser) {
    this.db.collection('entradas')
      .orderBy('fecha', 'desc')
      .get()
      .then(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts1').append(this.obtenerPostDia())
      } else {
        let n=0;
        querySnapshot.forEach(post => {
          if(emailUser== post.data().autor && n<1){
            let postHtml= this.obtenerPostDia(
              post.data().auto,
              post.data().comida,
              post.data().hogar,
              post.data().otros,
              post.data().total,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts1').append(postHtml)
            n++
          }
        })
      }
    })
  }

  
  obtenerPostSemana (
    postHtml,
    postHtml2
  ) {
    return `<div class="row">
    <div class="row ">
        <div class="col s3"> </div>
        <div class="col s16 mirec">
            <div id="GraficoGoogleChart-ejemplo-1" style="width: 800px; height: 600px"></div>
         </div>
         <div class="col s3"> </div>
    </div>
    
    </div>
    <script>
        google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(dibujarGrafico);
        function dibujarGrafico() {
          // Tabla de datos: valores y etiquetas de la gráfica
          var data = google.visualization.arrayToDataTable([
            ['Texto', 'Kg de CO2'],
            ['${postHtml2[6]}', ${postHtml[6]}],
            ['${postHtml2[5]}', ${postHtml[5]}],
            ['${postHtml2[4]}', ${postHtml[4]}],
            ['${postHtml2[3]}', ${postHtml[3]}],
            ['${postHtml2[2]}', ${postHtml[2]}],
            ['${postHtml2[1]}', ${postHtml[1]}],
            ['${postHtml2[0]}', ${postHtml[0]}]    
          ]);
          var options = {
            backgroundColor: 'none',
            colors:['green','#004411']
          }
          // Dibujar el gráfico
          new google.visualization.ColumnChart( 
          //ColumnChart sería el tipo de gráfico a dibujar
            document.getElementById('GraficoGoogleChart-ejemplo-1')
          ).draw(data, options);
        }
      </script>`
  }
  obtenerPostDia (
    auto,
    comida,
    hogar,
    otros,
    total,
    fecha
  ) {
    return `<div class="row center-align" >
    <div class="col s12 miInfo"> 
    <h3> CO2 total del ${fecha}: </h3>
    <h2> ${total} Kg </h2></div>
    <div class="col s3"> </div>
      <div class="col s6 center-align micirculo  miInfo" id="dia"style="z-index:0; ">
          <div class="" style="margin-top: 13%; " id="donutchart" ></div>
      </div>
    </div>
    </div>
    <script>
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['auto', ${auto}],
            ['hogar', ${comida}],
            ['comida',  ${hogar}],
            ['otros', ${otros}],
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
      </script>`
  }



}
