const { createChromeDriver, By, Key, until, login } = require('../setup-chrome');
const assert = require('assert');

jest.setTimeout(90000);

describe('VerPerfilFisio', function() {
  let driver;
  let vars;
  
  beforeEach(async function() {
    driver = await createChromeDriver();
    vars = {};
  });
  
  afterEach(async function() {
    if (driver) { 
      try {
        await driver.quit(); 
      } catch (error) {
        console.log('Error quitting driver:', error);
      }
    }
  });
  
  it('VerPerfilFisio', async function() {
    // Login como fisio
    const loginSuccess = await login(driver, "fisio1@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Navegar a Ver Perfil
    try {
      await driver.wait(until.elementLocated(By.linkText("Ver Perfil")), 15000);
      await driver.findElement(By.linkText("Ver Perfil")).click();
    } catch (error) {
      const perfilBtn = await driver.findElement(By.css('[href*="perfil"], [href*="profile"]'));
      await perfilBtn.click();
    }
    
    await driver.wait(until.elementLocated(By.css(".mt-6:nth-child(7)")), 10000);
    await driver.findElement(By.css(".mt-6:nth-child(7)")).click();
    
    await driver.findElement(By.css(".text-gray-600")).click();
    
    await driver.findElement(By.css(".mt-6:nth-child(8)")).click();
    await driver.findElement(By.css(".mt-6:nth-child(8)")).click();
    
    await driver.findElement(By.css(".w-full")).click();
  });
});