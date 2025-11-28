const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

async function createFirefoxDriver() {
  const options = new firefox.Options();
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

async function debugLogin() {
  const driver = await createFirefoxDriver();
  
  try {
    console.log('🧪 Starting login debug...');
    
    // 1. Ir a la página principal
    await driver.get("http://localhost:3000/");
    console.log('✅ Page loaded');
    
    // Tomar screenshot inicial
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync('debug-1-homepage.png', screenshot, 'base64');
    console.log('📸 Screenshot 1: Homepage saved');
    
    // 2. Buscar elementos del formulario
    const inputs = await driver.findElements(By.css('input'));
    console.log(`📝 Total inputs found: ${inputs.length}`);
    
    for (let i = 0; i < inputs.length; i++) {
      try {
        const type = await inputs[i].getAttribute('type');
        const placeholder = await inputs[i].getAttribute('placeholder');
        console.log(`  Input ${i}: type="${type}", placeholder="${placeholder}"`);
      } catch (e) {
        console.log(`  Input ${i}: [error reading attributes]`);
      }
    }
    
    // 3. Buscar botones
    const buttons = await driver.findElements(By.css('button'));
    console.log(`🔄 Total buttons found: ${buttons.length}`);
    
    for (let i = 0; i < buttons.length; i++) {
      try {
        const text = await buttons[i].getText();
        const type = await buttons[i].getAttribute('type');
        console.log(`  Button ${i}: text="${text}", type="${type}"`);
      } catch (e) {
        console.log(`  Button ${i}: [error reading attributes]`);
      }
    }
    
    // 4. Intentar encontrar email y password inputs
    let emailInput, passwordInput, loginButton;
    
    // Estrategia 1: Buscar por type
    try {
      emailInput = await driver.findElement(By.css('input[type="email"]'));
      console.log('✅ Found email input by type="email"');
    } catch (e) {
      try {
        emailInput = await driver.findElement(By.css('input[type="text"]'));
        console.log('✅ Found email input by type="text"');
      } catch (e) {
        // Estrategia 2: Buscar por placeholder
        try {
          emailInput = await driver.findElement(By.css('input[placeholder*="mail"], input[placeholder*="email"]'));
          console.log('✅ Found email input by placeholder');
        } catch (e) {
          // Estrategia 3: Usar el primer input
          if (inputs.length > 0) {
            emailInput = inputs[0];
            console.log('⚠️ Using first input as email');
          }
        }
      }
    }
    
    try {
      passwordInput = await driver.findElement(By.css('input[type="password"]'));
      console.log('✅ Found password input by type="password"');
    } catch (e) {
      // Estrategia 2: Buscar por placeholder
      try {
        passwordInput = await driver.findElement(By.css('input[placeholder*="password"], input[placeholder*="contraseña"]'));
        console.log('✅ Found password input by placeholder');
      } catch (e) {
        // Estrategia 3: Usar el segundo input
        if (inputs.length > 1) {
          passwordInput = inputs[1];
          console.log('⚠️ Using second input as password');
        }
      }
    }
    
    // 5. Buscar botón de login
    for (let button of buttons) {
      try {
        const text = await button.getText();
        if (text.toLowerCase().includes('login') || 
            text.toLowerCase().includes('iniciar') || 
            text.toLowerCase().includes('entrar') ||
            text === 'Login' ||
            text === 'Iniciar Sesión') {
          loginButton = button;
          console.log(`✅ Found login button: "${text}"`);
          break;
        }
      } catch (e) {}
    }
    
    if (!loginButton && buttons.length > 0) {
      loginButton = buttons[0];
      console.log('⚠️ Using first button as login button');
    }
    
    // 6. Intentar login si tenemos todos los elementos
    if (emailInput && passwordInput && loginButton) {
      console.log('🔐 Attempting login...');
      
      await emailInput.clear();
      await emailInput.sendKeys("nano@ull.es");
      await passwordInput.clear();
      await passwordInput.sendKeys("123456");
      
      // Screenshot después de llenar formulario
      screenshot = await driver.takeScreenshot();
      fs.writeFileSync('debug-2-form-filled.png', screenshot, 'base64');
      console.log('📸 Screenshot 2: Form filled saved');
      
      await loginButton.click();
      console.log('✅ Login button clicked');
      
      // 7. Esperar y ver qué pasa
      await driver.sleep(5000);
      
      const currentUrl = await driver.getCurrentUrl();
      console.log(`🌐 Current URL after login: ${currentUrl}`);
      
      // Screenshot después del login
      screenshot = await driver.takeScreenshot();
      fs.writeFileSync('debug-3-after-login.png', screenshot, 'base64');
      console.log('📸 Screenshot 3: After login saved');
      
      // 8. Verificar si hay mensajes de error
      const errorElements = await driver.findElements(By.css('[class*="error"], [class*="alert"], .text-red-500, .text-red-600'));
      console.log(`❌ Error elements found: ${errorElements.length}`);
      
      for (let error of errorElements) {
        try {
          const errorText = await error.getText();
          console.log(`  Error message: "${errorText}"`);
        } catch (e) {}
      }
      
      // 9. Verificar elementos de dashboard
      const dashboardElements = await driver.findElements(By.css('[class*="dashboard"], [class*="sidebar"], nav, .navbar'));
      console.log(`📊 Dashboard elements found: ${dashboardElements.length}`);
      
    } else {
      console.log('❌ Missing elements for login:');
      console.log(`  - Email input: ${!!emailInput}`);
      console.log(`  - Password input: ${!!passwordInput}`);
      console.log(`  - Login button: ${!!loginButton}`);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await driver.quit();
    console.log('🔚 Debug completed');
  }
}

debugLogin();