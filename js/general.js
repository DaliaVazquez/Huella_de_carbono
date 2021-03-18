$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig)

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background
  
  const post = new Post()

  

  // TODO: Firebase observador del cambio de estado

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#btnInicioSesion').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'img/us.png')
      }
      $('#avatarref').attr('href', 'perfil.html')
      console.log(`allPosts con Limit 2 => ${user.email}`)
      post.consultarDia(user.email)
      post.consultarTodosPost(user.email)
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'img/us.png')
      $('#avatarref').attr('href', '#')
    }
  })

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`SignOut Correcto`, 4000)
        })
        .catch(error => {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
        })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

 /* $('#avatar').click(() => {
        $('#avatar').attr('href', 'perfil.html')
    firebase
      .auth()
      .signOut()
      .then(() => {
        
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`SignOut correcto`, 4000)
      })
      .catch(error => {
        Materialize.toast(`Error al realizar SignOut ${error}`, 4000)
      })
  })*/

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    // $('#tituloPost').text('Mis Posts')
    // Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
  })
})
