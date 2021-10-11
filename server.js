const puppeteer = require("puppeteer");
const path = require("path");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
//const fs = require("fs");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" })); //Not needed
app.use(compression());

function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms)).catch(
    (err) => console.log(err)
  );
}

/* 
async function writeFile(file, buffer) {
  await fs.writeFile(file, JSON.stringify(buffer, null, 2), (err) => {
    console.log("Operation Completed");
    if (err) {
      console.log(err);
    }
  });
} */

async function lazyScrollSolver(page) {
  try {
    // Get the height of the rendered page
    const bodyHandle = await page.$("body");
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();

    // Scroll one viewport at a time, pausing to let content load
    const viewportHeight = page.viewport().height;
    let viewportIncr = 0;
    while (viewportIncr + viewportHeight < height) {
      await page
        .evaluate((_viewportHeight) => {
          window.scrollBy(0, _viewportHeight);
        }, viewportHeight)
        .catch((err) => {
          console.log(err);
        });
      await wait(20);
      viewportIncr = viewportIncr + viewportHeight;
    }

    // Scroll back to top
    await page
      .evaluate((_) => {
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });

    // Some extra delay to let images load
    // await wait(100);
  } catch (error) {
    console.log(error);
  }
}

async function fetchpage(outerArray, page, link, req,res) {
  for (let index = 1; index <= req.params.num; index++) {
    await page
      .goto(`${link}${index}`, {
        waitUntil: "load",
      })
      .catch((err) => {
        res.sendStatus(404, err.message);
      });
    await lazyScrollSolver(page);
    const evl = await page
      .evaluate(() => {
        let inner = [];
        document.querySelectorAll(".post-excerpt").forEach((element) => {
          inner.push({
            pic: element.childNodes[2].firstChild.firstChild.src,
            link: element.childNodes[2].firstChild.href,
          });
        });

        return { inner };
      })
      .catch((err) => {
        console.log(err);
      });
    await console.log("Page" + index + " Fetched");
    outerArray.push(evl.inner);
  }
}


app.get("/fetch::num", async (req, res) => {
  console.log("Starting Fetch");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  }); //Consider changing this if it fails on local

  try {
    const page = await browser.newPage();
    let outer = [];
    fetchpage(outer,page,"https://www.skidrowreloaded.com/page/",req).then(res.send(outer))
    .catch((err) => {console.log(err);});
    
  } catch (e) {
    console.log(e);
  } finally {
    browser.close()
      .then(() => {
        console.log("Fetch Completed");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/404",(req,res)=>{
  console.log("NOT FOUND")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//https://stackoverflow.com/questions/52225461/puppeteer-unable-to-run-on-heroku
