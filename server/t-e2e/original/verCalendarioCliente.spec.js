const { createFirefoxDriver, By, Key, until, login } = require('../setup-firefox');
const assert = require('assert');

jest.setTimeout(120000);

describe('VerCalendarioCliente', function() {
  let driver;
  let vars;
  
  beforeEach(async function() {
    driver = await createFirefoxDriver();
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
  
  it('VerCalendarioCliente', async function() {
    // Login como cliente
    const loginSuccess = await login(driver, "nano@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Interactuar con calendario
    await driver.findElement(By.css(".space-y-6")).click();
    await driver.findElement(By.css(".flex:nth-child(3) > span")).click();
    
    await driver.wait(until.elementLocated(By.css(".h-\\[120px\\]:nth-child(26) .text-left:nth-child(1)")), 10000);
    await driver.findElement(By.css(".h-\\[120px\\]:nth-child(26) .text-left:nth-child(1)")).click();
    
    await driver.findElement(By.css(".border-gray-300")).click();
    
    await driver.wait(until.elementLocated(By.css(".h-\\[120px\\]:nth-child(24) .text-left")), 5000);
    await driver.findElement(By.css(".h-\\[120px\\]:nth-child(24) .text-left")).click();
    
    await driver.findElement(By.css(".border-gray-300")).click();
    
    await driver.wait(until.elementLocated(By.css(".h-\\[120px\\]:nth-child(33) > .text-xs")), 5000);
    await driver.findElement(By.css(".h-\\[120px\\]:nth-child(33) > .text-xs")).click();
    
    await driver.wait(until.elementLocated(By.css(".space-y-1:nth-child(2) > .w-full")), 5000);
    await driver.findElement(By.css(".space-y-1:nth-child(2) > .w-full")).click();
    
    await driver.findElement(By.css(".border-gray-300")).click();
    
    await driver.findElement(By.css(".p-2:nth-child(3)")).click();
    
    await driver.wait(until.elementLocated(By.css(".h-\\[120px\\]:nth-child(4) .text-left")), 5000);
    await driver.findElement(By.css(".h-\\[120px\\]:nth-child(4) .text-left")).click();
    
    await driver.findElement(By.css(".border-gray-300")).click();
  });
});