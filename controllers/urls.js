const { urls } = require("../models");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");

const createUrl = async (req, res) => {
  try {
    const long_url = req.body.url;
    if (validUrl.isWebUri(long_url)) {
      let short_url = "/" + nanoid();
      const data = await urls.create({
        long_url,
        short_url,
      });
      return res.status(200).json({ status: 200, data });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "This is not a valid web uri" });
    }
  } catch (err) {}
};

const visitUrl = async (req, res) => {
  let short_url = `/${req.params.shorturl}`;
  console.log(short_url);
  try {
    const data = await urls.findOne({
      where: {
        short_url: short_url,
      },
    });
    if (data) {
      return res.redirect(data.long_url);
    } else {
      return res
        .status(200)
        .json({ message: "This url is not registered on our webiste" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server erroe" });
  }
};
module.exports = {
  createUrl,
  visitUrl,
};
