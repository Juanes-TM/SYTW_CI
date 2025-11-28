const { createFirefoxDriver, By, Key, until, login } = require('../setup-firefox');
const assert = require('assert');

jest.setTimeout(120000);

describe('CrearCitaCliente', function() {
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
  
  it('CrearCitaCliente', async function() {
    // Login como cliente
    const loginSuccess = await login(driver, "nano@ull.es", "123456");
    if (!loginSuccess) {
      throw new Error('Login failed');
    }
    
    await driver.sleep(3000);
    
    // Navegar a Reservar cita
    try {
      await driver.wait(until.elementLocated(By.linkText("Reservar cita")), 15000);
      await driver.findElement(By.linkText("Reservar cita")).click();
    } catch (error) {
      const reservarBtn = await driver.findElement(By.css('[href*="reservar"], [class*="reservar"]'));
      await reservarBtn.click();
    }
    
    await driver.wait(until.elementLocated(By.css(".border-gray-300")), 10000);
    await driver.findElement(By.css(".border-gray-300")).click();
    
    {
      const dropdown = await driver.findElement(By.css(".border-gray-300"));
      await dropdown.findElement(By.xpath("//option[. = 'fisio1 uno']")).click();
    }
    
    await driver.findElement(By.css("option:nth-child(2)")).click();
    await driver.findElement(By.css(".hover\\3A bg-teal-600")).click();
    
    await driver.wait(until.elementLocated(By.css(".grid:nth-child(3) > .border:nth-child(2)")), 10000);
    await driver.findElement(By.css(".grid:nth-child(3) > .border:nth-child(2)")).click();
    
    await driver.wait(until.elementLocated(By.css("div:nth-child(1) > .w-full")), 5000);
    await driver.findElement(By.css("div:nth-child(1) > .w-full")).click();
    await driver.findElement(By.css("div:nth-child(1) > .w-full")).sendKeys("Necesito una revisión");
    
    await driver.wait(until.elementLocated(By.css(".bg-teal-600")), 5000);
    await driver.findElement(By.css(".bg-teal-600")).click();
    
    await driver.executeScript("window.scrollTo(0,48)");
    
    await driver.wait(until.elementLocated(By.css(".text-indigo-700")), 5000);
    await driver.findElement(By.css(".text-indigo-700")).click();
    
    await driver.wait(until.elementLocated(By.css(".hover\\3A bg-gray-200")), 5000);
    await driver.findElement(By.css(".hover\\3A bg-gray-200")).click();
    
    await driver.wait(until.elementLocated(By.css(".bg-red-600")), 5000);
    await driver.findElement(By.css(".bg-red-600")).click();
  });
});