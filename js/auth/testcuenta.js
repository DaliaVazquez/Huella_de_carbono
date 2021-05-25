import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import * as path from "path";

const projectConfig = {
  projectId: "projectId",
  databaseURL: "databaseURL"
};
//const testEnv = functions(projectConfig, path.resolve("service-account.json"));
export const cuenta = (email, password, nombres) => {
    if(nombres.length===0){
        return `Debes colocar un nombre`;
    
    }else if(password.length===0){
      return `The password must be 6 characters long or more.`;
  
    }else if(email.length===0){
      return `The email address is badly formatted.`;
  
    }else if(email==='a01635883@itesm.mx'){
      return `The email address is already in use by another account.`;
  
    }else{
        
      return `Bienvenido jest, debes realizar el proceso de verificación`;
        
    }
}
export const sumar = (a, b) => {
    return a + b;
}
