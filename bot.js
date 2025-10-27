const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const config = require("./src/shared/config");

const bot = new Telegraf(config.tg.botToken);
const WEB_APP_URL = 'https://frontend-delta-lyart-82.vercel.app';
const API_URL = 'https://bot.sharq-dev.uz/api';

// Helper function - keyboard
const getMainKeyboard = (userId) => {
  return Markup.keyboard([
    [Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}?user=${userId}`)],
    ['ℹ️ Yordam']
  ]).resize();
};

// Start command
bot.start(async (ctx) => {
  try {
    const user = ctx.from;
    console.log('User started bot:', user.id, user.first_name);

    // Get or create user in backend
    try {
      const response = await axios.get(`${API_URL}/users/${user.id}`);
      console.log('User found:', response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        // User not found, create new
        console.log('User not found, creating new user...');
        try {
          const newUser = await axios.post(`${API_URL}/users`, {
            telegram_id: user.id,
            first_name: user.first_name,
            username: user.username || '',
            language_code: user.language_code || 'uz'
          });
          console.log('New user created:', newUser.data);
        } catch (createError) {
          console.error('Failed to create user:', createError.message);
        }
      } else {
        console.error('Error fetching user:', error.message);
      }
    }

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

    await ctx.replyWithMarkdown(welcomeMessage, getMainKeyboard(user.id));
  } catch (error) {
    console.error('Start command error:', error);
    await ctx.reply('❌ Xatolik yuz berdi. Iltimos, qaytadan /start buyrug\'ini yuboring.');
  }
});

// Yordam
bot.hears('ℹ️ Yordam', async (ctx) => {
  try {
    const helpMessage = `
ℹ️ *Qanday foydalanish kerak?*

1️⃣ *"✍️ Fikr Bildirish"* tugmasini bosing
2️⃣ Ochilgan web sahifada kategoriyani tanlang
3️⃣ So'rovnomalarga javob bering (ixtiyoriy)
4️⃣ O'z fikringizni yozing va yuboring

🔐 *Maxfiylik kafolati:*
• Barcha fikrlar anonim
• Shaxsiy ma'lumotlar saqlanmaydi
• Faqat kategoriya va matn ko'rinadi

💡 *Maslahat:* Aniq va konstruktiv fikr bildiring, bu universitetni yaxshilashga yordam beradi!
    `.trim();

    await ctx.replyWithMarkdown(helpMessage);
  } catch (error) {
    console.error('Yordam error:', error);
  }
});

// Text handler
bot.on('text', async (ctx) => {
  try {
    if (!ctx.message.text.startsWith('/')) {
      await ctx.reply(
        '🤔 Men sizni tushunmadim. "✍️ Fikr Bildirish" tugmasini bosing yoki /start buyrug\'ini yuboring.',
        getMainKeyboard(ctx.from.id)
      );
    }
  } catch (error) {
    console.error('Text handler error:', error);
  }
});

// Callback query handler
bot.on('callback_query', async (ctx) => {
  try {
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
  } catch (error) {
    console.error('Callback query error:', error);
  }
});

// Error handler
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  console.error('Context:', ctx.updateType);
  try {
    ctx.reply('❌ Xatolik yuz berdi. Iltimos, /start buyrug\'ini yuboring.');
  } catch (replyError) {
    console.error('Failed to send error message:', replyError);
  }
});

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('Received SIGINT, stopping bot...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('Received SIGTERM, stopping bot...');
  bot.stop('SIGTERM');
});

// Launch bot
bot.launch()
  .then(() => {
    console.log('✅ Bot muvaffaqiyatli ishga tushdi!');
    console.log('Bot username:', bot.botInfo?.username);
    console.log('Web App URL:', WEB_APP_URL);
    console.log('API URL:', API_URL);
  })
  .catch((err) => {
    console.error('❌ Bot ishga tushmadi:', err);
    process.exit(1);
  });

module.exports = bot;