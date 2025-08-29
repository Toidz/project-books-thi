const express = require('express');
const router = express.Router();
const Message = require("../../models/message.model")
const stringSimilarity = require('string-similarity');
router.post('/ask', async (req, res) => {
  const { message } = req.body;
  let receivedText = "";
  if(message) receivedText = message
  const keywords = ['Sách trong nước', "Sách nước ngoài",'Văn học',
  'Tiểu thuyết',
  'Kinh tế',
  'Sách thiếu nhi',
  'Manga - comic',
  'Truyện ngắn',
  "Children 's Book",
  'Education',
  'Quản trị - Lãnh đạo',
  'Marketing - Bán hàng',
  'Tâm lý - Kỹ nắng sống',
  'Tâm lý',
  'Kỹ năng sống',
  'Light Novel',
  'Sách Tranh Kỹ Năng Sống Cho Trẻ',
  ' Vừa Học Vừa Chơi Với Trẻ',
  'Picture & Activity Books',
  'Tiểu Sử Hồi Ký ',
  'Câu Chuyện Cuộc Đời']

  const lowerText = message.toLowerCase();
  const matchedKeyword = keywords.find(keyword => {
    const normalized = keyword.toLowerCase();
    console.log(normalized)

    return  lowerText.includes(normalized);
  });


  if (matchedKeyword) {
    const arrayReply = await Message.find({
      keyword:matchedKeyword
    }) 
    const listReply = arrayReply
      .map(message => {
        const similarity = stringSimilarity.compareTwoStrings(
          receivedText.toLowerCase(),
          message.receivedText.toLowerCase()
        );
        return {
          keyword:message.keyword,
          rating: similarity,
          message: message.replyText,
          receivedText: message.receivedText
        };
      })
      .filter(item => item.rating > 0);

    listReply.sort((a, b) => b.rating - a.rating);
    const reSult = listReply.slice(0, 5);
    if(reSult.length>0) req.session.reSults = reSult;
    console.log(req.session.reSults)
    if (reSult.length > 0) {
      res.json({
        success: true,
        reply: reSult[0].message
      });
    } else {
      res.json({
        success: false,
        reply: "Xin lỗi, chưa tìm thấy câu trả lời phù hợp."
      });
    }
  }
  else{
    if (req.session.reSults && req.session.reSults.length > 0) {
      const listReply = req.session.reSults
        .map(message => {
          const similarity = stringSimilarity.compareTwoStrings(
            receivedText.toLowerCase(),
            message.receivedText.toLowerCase()
          );
          return {
            keyword:message.keyword,
            rating: similarity,
            message: message.message,
            receivedText: message.receivedText
          };
        })
        .filter(item => item.rating > 0);
      console.log(listReply)
      listReply.sort((a, b) => b.rating - a.rating);
      const reSult = listReply.slice(0, 5);
      if(reSult.length>0) req.session.reSults = reSult;
      if (reSult.length > 0) {
        res.json({
          reply: reSult[0].message
        });
      } else {
        res.json({
          reply: "Xin lỗi, chưa tìm thấy câu trả lời phù hợp."
        });
      }
    }
    else{
      res.json({
        reply: "Xin lỗi, chưa tìm thấy câu trả lời phù hợp."
      });
    }
  }
});

module.exports = router;
// const { askChatGPT } = require('../../service/chat');

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: 'Vui lòng nhập nội dung.' });

//   const reply = await askChatGPT(message);
//   res.json({ reply });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { askGemini } = require("../../service/chat");

// router.post("/ask", async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: "Vui lòng nhập nội dung." });

//   const reply = await askGemini(message);
//   res.json({ reply });
// });

// module.exports = router;
