const authController = require("../controller/Auth.Controller.js");
const cantinaController = require("../controller/Cantina.Controller.js");

test('Check Dia()', function () {
    const diaDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    expect(cantinaController.Dia()).toBeDefined();
    expect(diaDaSemana).toContain(cantinaController.Dia());
});

test('Check Semana()', () => {
    expect(cantinaController.Semana()).toBeGreaterThan(-1);
})

test('Check Email()', function () {
    expect(authController.verifyEmail("andre@hotmail.com")).toBe(true);
    expect(authController.verifyEmail("andrehotmail.com")).toBe(false);
});
