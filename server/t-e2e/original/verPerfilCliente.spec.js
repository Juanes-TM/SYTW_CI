const { createChromeDriver, By, Key, until, login } = require('../setup-chrome');
const assert = require('assert');

jest.setTimeout(90000);

describe('VerPerfilCliente', function() {
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
  
  it('VerPerfilCliente', async function() {
    // Login como cliente
    const loginSuccess = await login(driver, "nano@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Navegar a Ver mi perfil
    try {
      await driver.wait(until.elementLocated(By.linkText("Ver mi perfil")), 15000);
      await driver.findElement(By.linkText("Ver mi perfil")).click();
    } catch (error) {
      const perfilBtn = await driver.findElement(By.css('[href*="perfil"], [href*="profile"], [class*="perfil"]'));
      await perfilBtn.click();
    }
    
    await driver.wait(until.elementLocated(By.css(".mt-6:nth-child(7)")), 10000);
    await driver.findElement(By.css(".mt-6:nth-child(7)")).click();
    
    await driver.findElement(By.css(".text-gray-600")).click();
    
    await driver.findElement(By.css(".mt-6:nth-child(8)")).click();
    await driver.findElement(By.css(".mt-6:nth-child(8)")).click();
    
    // Actions mejoradas
    try {
      const element = await driver.findElement(By.css(".flex-1:nth-child(3)"));
      await driver.actions({ bridge: true })
        .move({ origin: element })
        .pause(1000)
        .perform();
      
      await driver.findElement(By.css(".flex-1:nth-child(3)")).click();
    } catch (error) {
      console.log('Actions might have failed, continuing...');
      await driver.findElement(By.css(".flex-1:nth-child(3)")).click();
    }
  });
});