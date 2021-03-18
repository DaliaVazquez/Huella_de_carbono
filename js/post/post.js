class Post {
  constructor () {
    this.db = firebase.firestore();
    const settings = {timestampsInSnapshots : true}
    this.db.settings(settings)

  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection('posts')
      .add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        imagenLink: imagenLink,
        videoLink: videoLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log(`Id del post => ${refDoc.id}`)
      })
      .catch(error => {
        console.error(`Error creando el post => ${error}`)
      })
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

  consultarTodosPost () {
      this.db.collection('entradas')
      .orderBy('fecha', 'desc')
      .limit(7)
      .get()
      .then(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts').append(this.obtenerPostSemana())
      } else {
        let postHtml = [0,0,0,0,0,0,0];
        let postHtml2 = ["day","day","day","day","day","day","day"];
        let n=0;
        querySnapshot.forEach(post => {
          console.log(`allPosts con Limit 2 => ${post .data().auto}`)
          postHtml[n] = post.data().total;
          postHtml2[n] = Utilidad.obtenerFecha(post.data().fecha.toDate());
          n++;
        })
        $('#posts').append(this.obtenerPostSemana(postHtml,postHtml2))
      }
    })
  }
  consultarTodosPost2 () {
    this.db.collection('entradas').onSnapshot(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts').append(this.obtenerPostDia())
      } else {
        querySnapshot.forEach(post => {
          let postHtml = this.obtenerPostDia(
            post.data().auto,
            post.data().hogar,
            post.data().comida,
            post.data().otros,
            post.data().total,
            Utilidad.obtenerFecha(post.data().fecha.toDate())
          )
          $('#posts').append(postHtml)
        })
      }
    })
  }

  consultarPostxUsuario (emailUser) {
    this.db
      .collection('posts')
      .where('autor', '==', emailUser)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty) {
          $('#posts').append(this.obtenerTemplatePostVacio())
        } else {
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
          })
        }
      })
  }
  consultarDia () {
    this.db.collection('entradas')
      .orderBy('fecha', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
      $('#posts').empty()
      if (querySnapshot.empty) {
        $('#posts1').append(this.obtenerPostDia())
      } else {
        let postHtml = [0,0,0,0,0,0,0];
        let postHtml2 = ["day","day","day","day","day","day","day"];
        let n=0;
        querySnapshot.forEach(post => {
          console.log(`allPosts con Limit 1 => ${post .data().auto}`)
          postHtml[n] = post.data().total;
          postHtml2[n] = Utilidad.obtenerFecha(post.data().fecha.toDate());
          n++;
        })
        $('#posts1').append(this.obtenerPostDia(postHtml,postHtml2))
      }
    })
  }

  subirImagenPost (file, uid) {}

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }

  obtenerPostSemana (
    postHtml,
    postHtml2
  ) {
    return `<div class="row">
    <div class="row">
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
            ['${postHtml2[0]}', ${postHtml[0]}],
            ['${postHtml2[1]}', ${postHtml[1]}],
            ['${postHtml2[2]}', ${postHtml[2]}],
            ['${postHtml2[3]}', ${postHtml[3]}],
            ['${postHtml2[4]}', ${postHtml[4]}],
            ['${postHtml2[5]}', ${postHtml[5]}],
            ['${postHtml2[6]}', ${postHtml[6]}]    
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
    postHtml,
    postHtml2
  ) {
    return `<div class="row center-align" >
    <div class="col s3"> </div>
      <div class="col s6 center-align micirculo" id="dia"style="z-index:0; ">
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
      </script>`
  }



}
