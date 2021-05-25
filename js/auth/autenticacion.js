class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      if (result.user.emailVerified) {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
      } else {
        firebase.auth().signOut()
        Materialize.toast(
          `Por favor realiza la verificación de la cuenta`,
          5000
        )
      }
    })
    .catch(error => {
      console.error(error)
      console.log(error.message)
      Materialize.toast(error.message, 4000)
    })

    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, nombres) {
    if(nombres.length===0){
      Materialize.toast(
        `Debes colocar un nombre`,
        4000
      )
      console.log(`debes colocar un nombre`)
      
    }else{
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        
            result.user.updateProfile({
            displayName: nombres
          })

          const configuracion = {
            url: 'https://daliavazquez.github.io/Huella_de_carbono/'
          }

          result.user.sendEmailVerification(configuracion).catch(error => {
            console.error(error)
            console.log(error.message)
            Materialize.toast(error.message, 4000)
          })

          firebase.auth().signOut()

          Materialize.toast(
            `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
            4000
          )
          console.log(`Bienvenido ${nombres}, debes realizar el proceso de verificación`)
          $('.modal').modal('close')
        
        
      })
      .catch(error => {
        console.error(error)
        console.log(error.message)
        Materialize.toast(error.message, 4000)
      })
    }
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider).then(result => {
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
    .catch(error =>{
      console.error(error)
      Materialize.toast(`Error al autenticarse con google: ${error} `, 4000)
    })
  }

  

  resetPasswordByEmail(email) {
    if (email) {
      const auth = firebase.auth();

      const configuracion = {
        url: "https://daliavazquez.github.io/Huella_de_carbono/"
      };

      auth
        .sendPasswordResetEmail(email, configuracion)
        .then(result => {
          console.log(result);
          Materialize.toast(
            `Se ha enviado un correo para reestablecer la contraseña`,
            4000
          );

          $(".modal").modal("close");
        })
        .catch(error => {
          console.log(error);
          Materialize.toast(error.message, 4000);
        });
    } else {
      Materialize.toast(`Por favor ingrese su correo`, 4000);
    }
  }
}
