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
    await page.goto('http://localhost:3000/');
await page.reload('http://localhost:3000')
    await page.screenshot({path: './output/example1.png'});
    
    const image1 = fs.readFileSync("initialPage.png");
    const image2 = fs.readFileSync("output/example1.png");
  
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
  await page.goto('http://localhost:3000/');
  await page.reload('http://localhost:3000');
  await page.click('#odd');
  await page.screenshot({path: './output/example2.png',
fullPage:true});
  
  const image3 = fs.readFileSync("afterClickingOdd.png");
  const image4 = fs.readFileSync("output/example2.png");

  const diffpercent = await getDiff(
    image3 ,
    image4
  );
  console.log('TESTCASE:test_case2:success:',diffpercent);
  await browser.close();
})();

(async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
await page.reload('http://localhost:3000');
    await page.click('#even');
    await page.screenshot({path: './output/example3.png',
  fullPage:true});
    
    const image5 = fs.readFileSync("afterClickingEven.png");
    const image6 = fs.readFileSync("output/example3.png");
  
    const diffpercent = await getDiff(
      image5 ,
      image6
    );
    console.log('TESTCASE:test_case3:success:',diffpercent);
    await browser.close();
  })();

  (async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.reload('http://localhost:3000');
    await page.click('#reset');
    await page.screenshot({path: './output/example4.png',
  fullPage:true});
    
    const image5 = fs.readFileSync("afterClickingReset.png");
    const image6 = fs.readFileSync("output/example4.png");
  
    const diffpercent = await getDiff(
      image5 ,
      image6
    );
    console.log('TESTCASE:test_case4:success:',diffpercent);
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