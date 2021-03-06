const resemble = require('resemblejs');
const puppeteer = require('puppeteer');

// platform testing

var fs = require('fs');
(async () => {

    var dir = './output';
  
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  
  
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com/');
    await page.reload('https://example.com/');
    await page.setViewport({
      width:1200,
      height:800
    })
    await page.screenshot({path: './screenshot/output/example1.png',fullPage:true});
    
    const image1 = fs.readFileSync("./screenshot/initialPage.png");
    const image2 = fs.readFileSync("./screenshot/output/example1.png");
  
    const diffpercent = await getDiff(
      image1 ,
      image2
    );
    console.log('TESTCASE:test_case1:success:',diffpercent);
    await browser.close();
  })();


(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com/');
  await page.setViewport({
    width:1200,
    height:800,
  })
  await page.click('body > app-root > app-header > div > div > div.submit > button');
  await page.screenshot({path: './screenshot/output/example2.png'});
  
  const image3 = fs.readFileSync("./screenshot/afterClickSubmit.png");
  const image4 = fs.readFileSync("./screenshot/output/example2.png");

  const diffpercent = await getDiff(
    image3 ,
    image4
  );
  console.log('TESTCASE:test_case2:success:',diffpercent);
  await browser.close();
})();





const getDiff = async (image1, image2) => {
    return new Promise(async (resolve) => {
      const compare = require("resemblejs").compare;
      await compare(image1, image2, {}, function(err, data) {
          if (err) {
              console.log("An error!");
              resolve(0);
          } else {
              resolve(100 - data.rawMisMatchPercentage);
          }
      });
    });
  };
