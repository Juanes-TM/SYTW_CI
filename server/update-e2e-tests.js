const fs = require('fs');
const path = require('path');

const testsDir = path.join(__dirname, 't-e2e', 'original');

const testFiles = fs.readdirSync(testsDir).filter(file => file.endsWith('.spec.js'));

testFiles.forEach(file => {
  const filePath = path.join(testsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Reemplazar Chrome por Firefox
  content = content.replace(
    "const { createChromeDriver, By, Key, until, login } = require('../setup-chrome')",
    "const { createFirefoxDriver, By, Key, until, login } = require('../setup-firefox')"
  );
  
  content = content.replace(
    /driver = await createChromeDriver\(\)/g,
    "driver = await createFirefoxDriver()"
  );
  
  // Aumentar timeout
  if (content.includes('jest.setTimeout(90000)')) {
    content = content.replace('jest.setTimeout(90000)', 'jest.setTimeout(120000)');
  } else if (content.includes('jest.setTimeout(60000)')) {
    content = content.replace('jest.setTimeout(60000)', 'jest.setTimeout(120000)');
  } else if (content.includes('jest.setTimeout(30000)')) {
    content = content.replace('jest.setTimeout(30000)', 'jest.setTimeout(120000)');
  } else {
    content = "jest.setTimeout(120000);\n" + content;
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${file}`);
});

console.log('🎉 All tests updated for Firefox!');