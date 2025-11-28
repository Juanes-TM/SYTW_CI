// server/t-e2e/driver.js
const { Builder } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

function createDriver() {
  const options = new firefox.Options();

  // Ruta local Debian/Ubuntu con firefox-esr instalado
  const LOCAL_FIREFOX = "/usr/bin/firefox-esr";

  // GitHub Actions (browser-actions/setup-firefox) exporta FIREFOX_BIN; usarlo si existe
  const firefoxBinary = process.env.FIREFOX_BIN || LOCAL_FIREFOX;

  console.log("USANDO FIREFOX (driver):", firefoxBinary);

  options.setBinary(firefoxBinary);
  options.addArguments("--headless");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.setAcceptInsecureCerts(true);

  return new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();
}

module.exports = { createDriver };
