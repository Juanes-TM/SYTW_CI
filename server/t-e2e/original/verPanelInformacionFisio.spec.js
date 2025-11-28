const { createChromeDriver, By, Key, until, login } = require('../setup-chrome');
const assert = require('assert');

jest.setTimeout(90000);

describe('VerPanelInformacionFisio', function() {
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
  
  it('VerPanelInformacionFisio', async function() {
    // Login como fisio
    const loginSuccess = await login(driver, "fisio1@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Navegar a Panel de Información
    try {
      await driver.wait(until.elementLocated(By.linkText("Panel de Información")), 15000);
      await driver.findElement(By.linkText("Panel de Información")).click();
    } catch (error) {
      const panelBtn = await driver.findElement(By.css('[href*="panel"], [class*="panel"], [class*="informacion"]'));
      await panelBtn.click();
    }
    
    await driver.wait(until.elementLocated(By.css(".bg-white:nth-child(1) .flex > .text-sm")), 10000);
    await driver.findElement(By.css(".bg-white:nth-child(1) .flex > .text-sm")).click();
    await driver.findElement(By.css(".bg-white:nth-child(1) .flex > .text-sm")).click();
    
    await driver.findElement(By.css(".bg-white:nth-child(2) .flex > .text-sm")).click();
    await driver.findElement(By.css(".bg-white:nth-child(2) .flex > .text-sm")).click();
    
    await driver.findElement(By.css(".bg-white:nth-child(4) .flex > .text-sm")).click();
    await driver.findElement(By.css(".bg-white:nth-child(4) .flex > .text-sm")).click();
    
    await driver.findElement(By.css(".p-2:nth-child(1) .font-bold")).click();
    await driver.findElement(By.css(".py-1:nth-child(2)")).click();
    await driver.findElement(By.css(".rounded-md:nth-child(1)")).click();
    await driver.findElement(By.css(".w-full")).click();
  });
});