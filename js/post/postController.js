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

    let datos=[parseInt(camion),parseInt(coche),parseInt(taxi),parseInt(tele),parseInt(lap),parseInt(numFoco),parseInt(hrFoco),
      parseInt(ducha),parseInt(baño)]
    for(var i=0;i<datos.length; i++){
      if(isNaN(datos[i]) || datos[i]<0){
        datos[i]=0
      }
    }

    const transporte =((datos[0]* 69.3)+(datos[1]* 210.66)+(datos[2]* 138.66))/1000
    const hogar = ((datos[5]*datos[6]* 41.3736)+(1095572.28/4))/1000
    const agua = ((datos[7]* 20 * 133.33)+(datos[8] * 17 * 133.33))/1000
    const ocio= ((datos[3]* 181354.28)+(datos[4]* 241.346))/1000
    const otros = 5040/1000
    const total = otros+agua+hogar+transporte+ocio
    
    post
      .crearEntrada(
        user.uid,
        user.email,
        transporte, 
        hogar, 
        agua,
        ocio, 
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
