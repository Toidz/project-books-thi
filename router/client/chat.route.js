// const express = require('express');
// const router = express.Router();
// const { askChatGPT } = require('../../service/chat');

// router.post('/ask', async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: 'Vui lòng nhập nội dung.' });

//   const reply = await askChatGPT(message);
//   res.json({ reply });
// });

// module.exports = router;
// service/chat.js
const express = require("express");
const router = express.Router();
const { askGemini } = require("../../service/chat");

router.post("/ask", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Vui lòng nhập nội dung." });

  const reply = await askGemini(message);
  res.json({ reply });
});

module.exports = router;
