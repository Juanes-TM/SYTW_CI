const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

function createFirefoxDriver() {
  const options = new firefox.Options();
  
  // Configuración para Firefox en CI
  options.addArguments('-headless');
  
  const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
    
  driver.manage().setTimeouts({ 
    implicit: 15000, 
    pageLoad: 30000,
    script: 30000 
  });
  
  return driver;
}

async function login(driver, email, password) {
  console.log(`🔐 Attempting login for: ${email}`);
  
  await driver.get("http://localhost:3000/");
  
  // Esperar y llenar formulario
  await driver.wait(until.elementLocated(By.css('input[type="email"], input[type="text"]')), 20000);
  const emailInput = await driver.findElement(By.css('input[type="email"], input[type="text"]'));
  await emailInput.clear();
  await emailInput.sendKeys(email);
  
  const passwordInput = await driver.findElement(By.css('input[type="password"]'));
  await passwordInput.clear();
  await passwordInput.sendKeys(password);
  
  // Buscar botón de login
  const loginButton = await driver.findElement(By.css('button[type="submit"], .bg-teal-600, button'));
  await loginButton.click();
  
  console.log('⏳ Waiting for login to complete...');
  
  // Estrategia de espera mejorada para Firefox
  try {
    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl.includes('/dashboard') || 
             currentUrl.includes('/calendar') ||
             currentUrl !== 'http://localhost:3000/';
    }, 25000);
    
    const finalUrl = await driver.getCurrentUrl();
    console.log(`✅ Login successful. Final URL: ${finalUrl}`);
    return true;
    
  } catch (error) {
    console.log('⚠️  Login might have succeeded but timeout reached');
    
    // Verificar si estamos en una página diferente
    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl !== 'http://localhost:3000/') {
      console.log(`✅ Redirected to: ${currentUrl} - assuming login succeeded`);
      return true;
    }
    
    return false;
  }
}

module.exports = { createFirefoxDriver, By, Key, until, login };