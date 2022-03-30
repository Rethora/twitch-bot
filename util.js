const { Builder } = require('selenium-webdriver');
const PNGCrop = require('png-crop');
const { createWorker } = require('tesseract.js');
const { scoredMatches } = require('./assets');
const path = require('path')
require('dotenv').config()

const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const crop = (imgname, outputname) => {
  var config = { width: 900, height: 100, top: 285, left: 200 };

  PNGCrop.crop(imgname, outputname, config, (err) => {
    if (err) throw err;
  });
}

const getPlayer = async (channel, wait) => {
  let driver = await new Builder(process.env.GECKO_DRIVER_PATH).forBrowser('firefox').build();
  const player = `https://player.twitch.tv/?channel=${channel}&muted=true&parent=twitch.tv&player=popout`;
  try {
    await driver.get(player);
    sleep(wait);
  } catch (err) {
    console.error(err);
  }
  return driver;
}

const goalScored = async (player, rlName, tmpdir) => {
  const img = await player.takeScreenshot();
  const imgPath = path.join(tmpdir, 'cropped.png')
  crop(Buffer.from(img, 'base64'), imgPath);
  const text = await readImgText(imgPath);

  if (scoredMatches.some(match => text.toLowerCase().includes(match))) {
    if (rlNameMatch(rlName.toLowerCase(), text.toLowerCase())) {
      return 'streamer'
    }
    else {
      return 'oponent'
    }
  }
  return 'none'
}

const rlNameMatch = (name, text) => {
  const matches = [
    name,
    name.substring(1, name.length - 1),
    name.substring(2, name.length - 1),
    name.substring(0, name.length - 2),
    name.substring(0, name.length - 3),
  ];
  if (matches.some(match => text.includes(match))) return true;
  // if (text.includes(name)) return true;
  return false;
}

const worker = createWorker({
  // logger: m => console.log(m),
  errorHandler: e => console.error(e)
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
})();

const readImgText = async (img) => {
  try {
    // await worker.load();
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(img)
    return text
  } catch (err) {
    console.error(err)
    return ''
  }
}

module.exports = { getPlayer, goalScored, sleep }
