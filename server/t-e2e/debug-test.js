const { createChromeDriver, By, Key, until } = require('./setup-chrome');

async function debugLogin() {
  const driver = await createChromeDriver();
  
  try {
    console.log('🧪 Starting debug test...');
    
    await driver.get("http://localhost:3000/");
    console.log('✅ Page loaded');
    
    // Tomar screenshot
    const screenshot = await driver.takeScreenshot();
    require('fs').writeFileSync('debug-homepage.png', screenshot, 'base64');
    console.log('📸 Screenshot saved: debug-homepage.png');
    
    // Verificar elementos de la página
    const emailInputs = await driver.findElements(By.css('input[type="email"], input[type="text"]'));
    console.log(`📧 Email inputs found: ${emailInputs.length}`);
    
    const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
    console.log(`🔑 Password inputs found: ${passwordInputs.length}`);
    
    const buttons = await driver.findElements(By.css('button'));
    console.log(`🔄 Buttons found: ${buttons.length}`);
    
    // Intentar login
    if (emailInputs.length > 0 && passwordInputs.length > 0) {
      await emailInputs[0].sendKeys("nano@ull.es");
      await passwordInputs[0].sendKeys("123456");
      
      if (buttons.length > 0) {
        await buttons[0].click();
        console.log('✅ Login button clicked');
        
        // Esperar y ver qué pasa
        await driver.sleep(5000);
        
        const currentUrl = await driver.getCurrentUrl();
        console.log(`🌐 Current URL: ${currentUrl}`);
        
        // Tomar screenshot después del login
        const afterLoginScreenshot = await driver.takeScreenshot();
        require('fs').writeFileSync('debug-after-login.png', afterLoginScreenshot, 'base64');
        console.log('📸 After-login screenshot saved');
      }
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await driver.quit();
  }
}

debugLogin();