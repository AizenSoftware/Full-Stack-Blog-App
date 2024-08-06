const axios = require("axios");
const checkComment = async (commentDesc) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      desc: commentDesc,
    });

    return response.data.result === "spam";
  } catch (error) {
    console.error("Error:", error);
    return "Bir hata oluştu!.";
  }
};
module.exports = checkComment;
