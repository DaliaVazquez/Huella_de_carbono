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

  $('#btnRegistroPost').click(() => {
    const post = new Post()
    // TODO: Validar que el usuario esta autenticado
    const user = firebase.auth().currentUser
    if(user == null) {
      Materialize.toast(`Para crear el Post debes estar autenticado`, 4000)
      // Hacemos esto para que no se ejecute lo demas
      return
    }
    
    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
    

    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000)
        $('.modal').modal('close')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
      })
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
    

    const info = $('#num').val()
    
    post
      .crearEntrada(
        user.uid,
        user.email,
        info,
        info,
        info,
        info,
        info
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000)
        $('.modal').modal('close')
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000)
      })
  })

  $('#btnUploadFile').on('change', e => {
    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0]

    // TODO: Referencia al storage
    
  })

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
})
