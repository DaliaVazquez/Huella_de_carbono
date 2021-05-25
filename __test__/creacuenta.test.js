import {  cuenta} from '../js/auth/testcuenta.js';

describe('Pruebas de crear cuenta', () =>{
    test('Crear cuenta con el nombre vacio', () => {
        expect(cuenta('a18@itesm.mx','123456','')).toBe(`Debes colocar un nombre`);
    });
    test('Crear cuenta con el email vacio', () => {
        expect(cuenta('','123456','jest')).toBe(`The email address is badly formatted.`);
    });
    test('Crear cuenta con contraseña vacia', () => {
        expect(cuenta('a18@itesm.mx','','jest')).toBe(`The password must be 6 characters long or more.`);
    });
    test('Crear cuenta con email ya registrado', () => {
        expect(cuenta('a01635883@itesm.mx','123456','jest')).toBe(`The email address is already in use by another account.`);
    });
    test('Crear cuenta con datos correctos', () => {
        expect(cuenta('a18@itesm.mx','123456','jest')).toBe(`Bienvenido jest, debes realizar el proceso de verificación`);
    });
});