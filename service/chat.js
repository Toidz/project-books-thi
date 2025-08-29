const axios = require('axios');
require('dotenv').config();

const askChatGPT = async (messageText) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  
        messages: [
          { role: 'system', content: 'Bạn là trợ lý tư vấn sách thông minh.' },
          { role: 'user', content: messageText }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Lỗi gọi OpenAI:', error.response?.data || error.message);
    return 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.';
  }
};

module.exports = { askChatGPT };
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyDK5_G2GhJkiweqVfU0ers0t0sKN-wTcdk");

// async function askGemini(message) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(`Bạn là một trợ lý tư vấn sách. Gợi ý sách phù hợp cho người dùng với yêu cầu: "${message}".`);

//     const response = result.response;
//     const text = response.text();

//     return text;
//   } catch (error) {
//     console.error("Gemini error:", error);
//     return "Lỗi khi gọi Gemini.";
//   }
// }

// module.exports = { askGemini };
