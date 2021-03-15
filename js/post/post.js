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
    this.db.collection('posts').onSnapshot(querySnapshot => {
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
    this.db
      .collection('entradas')
      .where('autor', '==', emailUser)
      .onSnapshot(querySnapshot => {
        $('#posts').empty()
          querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostDia(
              respDoc.data().auto,
              respDoc.data().hogar,
              respDoc.data().comida,
              respDoc.data().otros,
              respDoc.data().total,
              Utilidad.obtenerFecha(respDoc.data().fecha.toDate())
            )
            $('#posts').append(postHtml)
          })
        
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

  obtenerPostDia (
    auto,
    hogar,
    comida,
    otros,
    total,
    fecha
  ) {
    return `<div class="row">
    <div class="row">
        <div class="col s3"> </div>
        <div class="col s16">
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
            ['Texto', 'Valor numérico'],
            ['Texto1', ${auto}],
            ['Texto2',  ${hogar}],
            ['Texto3', 17.26],
            ['Texto4', 10.25]    
          ]);
          var options = {
            title: 'Nuestro primer ejemplo con Google Charts',
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



}
