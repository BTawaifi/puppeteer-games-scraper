const puppeteer = require('puppeteer');
const fs = require("fs");
const express = require('express');
const app = express();
app.use(express.static('public'));


function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

async function lazyScrollSolver(page) {
  // Get the height of the rendered page
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  // Scroll one viewport at a time, pausing to let content load
  const viewportHeight = page.viewport().height;
  let viewportIncr = 0;
  while (viewportIncr + viewportHeight < height) {
    await page.evaluate(_viewportHeight => {
      window.scrollBy(0, _viewportHeight);
    }, viewportHeight);
    await wait(20);
    viewportIncr = viewportIncr + viewportHeight;
  }

  // Scroll back to top
  await page.evaluate(_ => {
    window.scrollTo(0, 0);
  });

  // Some extra delay to let images load
  await wait(100);
}

(async () => {

    //clear
    await fs.writeFile(
        `./public/GameList.json`,
        '',
        (err) => {
          if (err) res.send(err)
        }
      );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  lazyScrollSolver(page)
  
  for (let index = 1; index <= 1; index++) {
      await page.goto(`https://www.skidrowreloaded.com/page/${index}`,{waitUntil: 'load'});
 
      const evl=await page.evaluate(()=>{
        let outer=[];
        document.querySelectorAll('.post-excerpt').forEach(element=>{
            outer.push({
              pic:element.childNodes[2].firstChild.firstChild.src,
              link:element.childNodes[2].firstChild.href
            }
          )
        })
        return{outer}
      })
      
      await console.log(evl);
      await fs.appendFile(`./public/GameList.json`,JSON.stringify(evl, null, 2),(err) => {
          if (err) console.log(err);
        }
      );
  }

  debugger;
  await browser.close();
})();


  //https://expressjs.com/en/starter/examples.html reference

  app.listen(5000,()=>console.log("Listening on port 5000"))