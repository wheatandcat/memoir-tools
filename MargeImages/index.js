const sharp = require("sharp");
const axios = require("axios");
const imageHost = process.env.IMAGE_HOST;
const imageParam = process.env.IMAGE_PARAM;

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
    const image1 = await getImageData(`${imageHost}${urlList[i]}${imageParam}`);
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
  const param = req.query.images;
  const urlList = param.split(",");

  const buf = await margeImage(urlList);

  res.status(200).send(buf);
};
