const { createChromeDriver, By, Key, until, login } = require('../setup-chrome');
const assert = require('assert');

jest.setTimeout(90000);

describe('disponibilidad', function() {
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
  
  it('disponibilidad', async function() {
    // Login como fisio
    const loginSuccess = await login(driver, "fisio1@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Navegar a Disponibilidad
    try {
      await driver.wait(until.elementLocated(By.linkText("Disponibilidad")), 15000);
      await driver.findElement(By.linkText("Disponibilidad")).click();
    } catch (error) {
      const disponibilidadBtn = await driver.findElement(By.css('[href*="disponibilidad"], [class*="disponibilidad"]'));
      await disponibilidadBtn.click();
    }
    
    await driver.wait(until.elementLocated(By.css(".border:nth-child(1) .text-sm")), 10000);
    await driver.findElement(By.css(".border:nth-child(1) .text-sm")).click();
    
    await driver.wait(until.elementLocated(By.css(".ml-auto")), 5000);
    await driver.findElement(By.css(".ml-auto")).click();
    
    await driver.findElement(By.css(".border:nth-child(1) .text-sm")).click();
    
    await driver.wait(until.elementLocated(By.css(".px-4")), 5000);
    await driver.findElement(By.css(".px-4")).click();
    await driver.findElement(By.css(".px-4")).click();
    await driver.findElement(By.css(".px-4")).click();
    
    await driver.findElement(By.css(".w-full")).click();
  });
});