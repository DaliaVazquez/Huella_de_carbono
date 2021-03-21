$(() => {
  
  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('open')
  })


  $('#btninfo').click(() => {
    const post = new Post()
    // TODO: Validar que el usuario esta autenticado
    const user = firebase.auth().currentUser
    if(user == null) {
      Materialize.toast(`Para crear la entrada debes estar autenticado`, 4000)
      // Hacemos esto para que no se ejecute lo demas
      return
    }
    
    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
    
    const ducha = $('#num1').val()
    const baño = $('#num2').val()
    const coche = $('#num3').val()
    const camion = $('#num4').val()
    const taxi = $('#num5').val()
    const tele = $('#num6').val()
    const lap = $('#num7').val()
    const numFoco= $('#num8').val()
    const hrFoco= $('#num9').val()

    if(ducha==NaN){
      console.log(`d => ${ducha}`)
    }

    const transporte =parseInt(camion)+parseInt(coche)+parseInt(taxi)
    const hogar = parseInt(tele)+parseInt(lap)+parseInt(numFoco)+parseInt(hrFoco)
    const agua = parseInt(ducha)+parseInt(baño)
    const otros = 5040
    const total = otros+agua+hogar+transporte
    
    post
      .crearEntrada(
        user.uid,
        user.email,
        transporte, 
        hogar, 
        agua, 
        otros,
        total
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000)
        $('.modal').modal('close')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
      })
  })



})
