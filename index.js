const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const config = require("./config");
const bot = new Telegraf(config.tg.botToken);
const WEB_APP_URL = 'https://frontend-delta-lyart-82.vercel.app';
const API_URL = 'https://bot.sharq-dev.uz/api';
// const API_URL = 'http://localhost:3001/api';


// Helper function - keyboard
const getMainKeyboard = (userId) => {
  return Markup.keyboard([
    [Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}?user=${userId}`)],
    // ['ℹ️ Yordam']
  ]).resize();
};

// Start command
bot.start(async (ctx) => {
  const user = ctx.from;

  const welcomeMessage = `
👋 Assalomu alaykum, *${user.first_name}*!

🎓 *Universitet Anonim Feedback Botiga Xush Kelibsiz!*

Bu yerda siz universitetimiz haqida o'z fikrlaringizni erkin bildirishingiz mumkin. Barcha javoblar *100% anonim* tarzda qayd etiladi.

📋 *Mavjud kategoriyalar:*
• 💡 Takliflar
• ⚠️ Shikoyatlar  
• 📚 Darslar haqida
• 🏢 Infratuzilma
• 💬 Boshqa

🔒 *Maxfiylik:* Sizning shaxsiy ma'lumotlaringiz hech qachon saqlanmaydi.

Boshlash uchun "✍️ Fikr Bildirish" tugmasini bosing! 👇
  `.trim();
  const result_user=(await axios.get(`${API_URL}/users/${ctx.from.id}`))
  // const result_user2 = await axios.post(`${API_URL}/users`, {
  //   id: ctx.from.id,
  //   first_name: ctx.from.first_name,
  //   telegram_id: ctx.from.id,
  //   username: ctx.from.username,
  //   language_code: ctx.from.language_code
  // });
console.log(result_user);

  console.log(result_user);

  await ctx.replyWithMarkdown(welcomeMessage, getMainKeyboard(user.id));
});

// Statistika
// bot.hears('📊 Statistika', async (ctx) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/stats`);
//     const stats = response.data;

//     const message = `
// 📊 *Umumiy Statistika*

// ✅ Jami fikrlar: *${stats.totalFeedbacks || 0}* ta
// 📝 Bugungi fikrlar: *${stats.todayFeedbacks || 0}* ta
// 📈 Haftalik fikrlar: *${stats.weeklyFeedbacks || 0}* ta

// 🏆 *Eng faol kategoriya:* ${stats.topCategory || 'Ma\'lumot yo\'q'}

// Rahmat, sizning fikringiz biz uchun muhim! 🙏
//     `.trim();

//     await ctx.replyWithMarkdown(message);
//   } catch (error) {
//     console.error('Stats error:', error);
//     await ctx.reply('❌ Statistikani yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
//   }
// });

// // Yordam
// bot.hears('ℹ️ Yordam', async (ctx) => {
//   const helpMessage = `
// ℹ️ *Qanday foydalanish kerak?*

// 1️⃣ *"✍️ Fikr Bildirish"* tugmasini bosing
// 2️⃣ Ochilgan web sahifada kategoriyani tanlang
// 3️⃣ So'rovnomalarga javob bering (ixtiyoriy)
// 4️⃣ O'z fikringizni yozing va yuboring

// 🔐 *Maxfiylik kafolati:*
// • Barcha fikrlar anonim
// • Shaxsiy ma'lumotlar saqlanmaydi
// • Faqat kategoriya va matn ko'rinadi

// 📞 *Savol yoki muammo?*
// Administrator bilan bog'laning: @admin_username

// 💡 *Maslahat:* Aniq va konstruktiv fikr bildiring, bu universitetni yaxshilashga yordam beradi!
//   `.trim();

//   await ctx.replyWithMarkdown(helpMessage);
// });

// Feedback submission notification (webhook dan keladi)
bot.on('text', async (ctx) => {
  // Agar oddiy text bo'lsa, yordam ko'rsatish
  if (!ctx.message.text.startsWith('/')) {
    await ctx.reply(
      '🤔 Men sizni tushunmadim. Yordam uchun "ℹ️ Yordam" tugmasini bosing.',
      getMainKeyboard(ctx.from.id)
    );
  }
});

// Callback query handler (inline buttons uchun)
bot.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery('Ishlanmoqda...');

  const data = ctx.callbackQuery.data;

  if (data === 'view_categories') {
    const categoriesMessage = `
📋 *Mavjud kategoriyalar:*

💡 *Takliflar* - Yangi g'oyalar va takliflar
⚠️ *Shikoyatlar* - Muammolar va kamchiliklar
📚 *Darslar* - O'quv jarayoni haqida
🏢 *Infratuzilma* - Bino, jihozlar haqida
💬 *Boshqa* - Qolgan fikrlar

Web ilovani ochish uchun "✍️ Fikr Bildirish" tugmasini bosing.
    `.trim();

    await ctx.editMessageText(categoriesMessage, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🌐 Web Ilovani Ochish', `${WEB_APP_URL}?user=${ctx.from.id}`)],
        [Markup.button.callback('« Orqaga', 'back_to_main')]
      ])
    });
  }

  if (data === 'back_to_main') {
    await ctx.editMessageText(
      '👋 Asosiy menyuga qaytdingiz. Kerakli tugmani tanlang.',
      getMainKeyboard(ctx.from.id)
    );
  }
});

// Error handler
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki /start buyrug\'ini yuboring.');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Launch bot
bot.launch()
  .then(() => console.log('✅ Bot muvaffaqiyatli ishga tushdi!'))
  .catch((err) => console.error('❌ Bot ishga tushmadi:', err));

module.exports = bot;