// server/t-e2e/original/verPerfilFisio.spec.js
const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');
const { createDriver } = require('../driver');

console.log("USANDO FIREFOX:", process.env.FIREFOX_BIN);

describe('VerPerfilFisio', function() {
  jest.setTimeout(60000);
  let driver;
  let vars;

  beforeEach(async function() {
    driver = await createDriver();
    vars = {};
  });

  afterEach(async function() {
    if (driver) await driver.quit();
  });

  it('VerPerfilFisio', async function() {
    await driver.get("https://10.6.131.134/");
    await driver.manage().window().setRect({ width: 1070, height: 1063 });

    // Login
    await driver.findElement(By.css(".w-full:nth-child(1)")).sendKeys("fisio1@ull.es");
    await driver.findElement(By.css(".w-full:nth-child(2)")).sendKeys("123456");
    await driver.findElement(By.css("button[type='submit']")).click();

    // Esperar a que cargue el dashboard
    await driver.sleep(5000);

    // Para fisio, buscar "Ver Perfil" o "Ver mi perfil"
    try {
      await driver.findElement(By.linkText("Ver Perfil")).click();
    } catch (e) {
      await driver.findElement(By.linkText("Ver mi perfil")).click();
    }

    await driver.sleep(2000);

    // Continuar con el resto del flujo
    await driver.findElement(By.css(".mt-6:nth-child(7)")).click();
    await driver.findElement(By.css(".text-gray-600")).click();
    await driver.findElement(By.css(".mt-6:nth-child(8)")).click();
    await driver.findElement(By.css(".w-full")).click();
  });
});