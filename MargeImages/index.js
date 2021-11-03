const sharp = require("sharp");
const axios = require("axios");

const getImageData = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "utf-8");

  const image = await sharp(buffer);
  const r = await image.metadata();
  const buf = await image.toBuffer();

  return {
    width: r.width,
    height: r.height,
    buf,
  };
};

const margeImage = async (urlList) => {
  let images = [];

  for (let i = 0; i < urlList.length; i++) {
    const image1 = await getImageData(urlList[i]);
    images.push(image1);
  }

  let totalTop = 0;

  const height = images.map((v) => v.height).reduce((a, x) => (a += x), 0);

  const buf = await sharp({
    create: {
      width: images[0].width,
      height: height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite(
      images.map((v, i) => {
        if (i > 0) {
          totalTop += images[i - 1].height;
        }

        return {
          input: v.buf,
          gravity: "northwest",
          left: 0,
          top: totalTop,
        };
      })
    )
    .toFormat("png")
    .toBuffer();

  return buf;
};

exports.margeImage = async (req, res) => {
  const buf = await margeImage([
    "https://placehold.jp/150x250.png",
    "https://placehold.jp/150x150.png",
  ]);

  res.status(200).send(buf);
};
