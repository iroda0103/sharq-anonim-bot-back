// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');
// const config = require("./src/shared/config");

// const bot = new Telegraf(config.tg.botToken);
// const WEB_APP_URL = 'https://frontend-delta-lyart-82.vercel.app';
// const API_URL = 'https://bot.sharq-dev.uz/api';

// // Helper function - keyboard
// const getMainKeyboard = (userId) => {
//   return Markup.keyboard([
//     [Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}?user=${userId}`)],
//     ['ℹ️ Yordam']
//   ]).resize();
// };

// // Start command
// bot.start(async (ctx) => {
//   try {
//     const user = ctx.from;
//     console.log('User started bot:', user.id, user.first_name);

//     // Get or create user in backend
//     try {
//       const response = await axios.get(`${API_URL}/users/${user.id}`);
//       console.log('User found:', response.data);
//     } catch (error) {
//       if (error.response?.status === 404) {
//         // User not found, create new
//         console.log('User not found, creating new user...');
//         try {
//           const newUser = await axios.post(`${API_URL}/users`, {
//             telegram_id: user.id,
//             first_name: user.first_name,
//             username: user.username || '',
//             language_code: user.language_code || 'uz'
//           });
//           console.log('New user created:', newUser.data);
//         } catch (createError) {
//           console.error('Failed to create user:', createError.message);
//         }
//       } else {
//         console.error('Error fetching user:', error.message);
//       }
//     }

//     const welcomeMessage = `
// 👋 Assalomu alaykum, *${user.first_name}*!

// 🎓 *Universitet Anonim Feedback Botiga Xush Kelibsiz!*

// Bu yerda siz universitetimiz haqida o'z fikrlaringizni erkin bildirishingiz mumkin. Barcha javoblar *100% anonim* tarzda qayd etiladi.

// 📋 *Mavjud kategoriyalar:*
// • 💡 Takliflar
// • ⚠️ Shikoyatlar  
// • 📚 Darslar haqida
// • 🏢 Infratuzilma
// • 💬 Boshqa

// 🔒 *Maxfiylik:* Sizning shaxsiy ma'lumotlaringiz hech qachon saqlanmaydi.

// Boshlash uchun "✍️ Fikr Bildirish" tugmasini bosing! 👇
//     `.trim();

//     await ctx.replyWithMarkdown(welcomeMessage, getMainKeyboard(user.id));
//   } catch (error) {
//     console.error('Start command error:', error);
//     await ctx.reply('❌ Xatolik yuz berdi. Iltimos, qaytadan /start buyrug\'ini yuboring.');
//   }
// });

// // Yordam
// bot.hears('ℹ️ Yordam', async (ctx) => {
//   try {
//     const helpMessage = `
// ℹ️ *Qanday foydalanish kerak?*

// 1️⃣ *"✍️ Fikr Bildirish"* tugmasini bosing
// 2️⃣ Ochilgan web sahifada kategoriyani tanlang
// 3️⃣ So'rovnomalarga javob bering (ixtiyoriy)
// 4️⃣ O'z fikringizni yozing va yuboring

// 🔐 *Maxfiylik kafolati:*
// • Barcha fikrlar anonim
// • Shaxsiy ma'lumotlar saqlanmaydi
// • Faqat kategoriya va matn ko'rinadi

// 💡 *Maslahat:* Aniq va konstruktiv fikr bildiring, bu universitetni yaxshilashga yordam beradi!
//     `.trim();

//     await ctx.replyWithMarkdown(helpMessage);
//   } catch (error) {
//     console.error('Yordam error:', error);
//   }
// });

// // Text handler
// bot.on('text', async (ctx) => {
//   try {
//     if (!ctx.message.text.startsWith('/')) {
//       await ctx.reply(
//         '🤔 Men sizni tushunmadim. "✍️ Fikr Bildirish" tugmasini bosing yoki /start buyrug\'ini yuboring.',
//         getMainKeyboard(ctx.from.id)
//       );
//     }
//   } catch (error) {
//     console.error('Text handler error:', error);
//   }
// });

// // Callback query handler
// bot.on('callback_query', async (ctx) => {
//   try {
//     await ctx.answerCbQuery('Ishlanmoqda...');
//     const data = ctx.callbackQuery.data;

//     if (data === 'view_categories') {
//       const categoriesMessage = `
// 📋 *Mavjud kategoriyalar:*

// 💡 *Takliflar* - Yangi g'oyalar va takliflar
// ⚠️ *Shikoyatlar* - Muammolar va kamchiliklar
// 📚 *Darslar* - O'quv jarayoni haqida
// 🏢 *Infratuzilma* - Bino, jihozlar haqida
// 💬 *Boshqa* - Qolgan fikrlar

// Web ilovani ochish uchun "✍️ Fikr Bildirish" tugmasini bosing.
//       `.trim();

//       await ctx.editMessageText(categoriesMessage, {
//         parse_mode: 'Markdown',
//         ...Markup.inlineKeyboard([
//           [Markup.button.webApp('🌐 Web Ilovani Ochish', `${WEB_APP_URL}?user=${ctx.from.id}`)],
//           [Markup.button.callback('« Orqaga', 'back_to_main')]
//         ])
//       });
//     }

//     if (data === 'back_to_main') {
//       await ctx.editMessageText(
//         '👋 Asosiy menyuga qaytdingiz. Kerakli tugmani tanlang.',
//         getMainKeyboard(ctx.from.id)
//       );
//     }
//   } catch (error) {
//     console.error('Callback query error:', error);
//   }
// });

// // Error handler
// bot.catch((err, ctx) => {
//   console.error('Bot error:', err);
//   console.error('Context:', ctx.updateType);
//   try {
//     ctx.reply('❌ Xatolik yuz berdi. Iltimos, /start buyrug\'ini yuboring.');
//   } catch (replyError) {
//     console.error('Failed to send error message:', replyError);
//   }
// });

// // Graceful shutdown
// process.once('SIGINT', () => {
//   console.log('Received SIGINT, stopping bot...');
//   bot.stop('SIGINT');
// });

// process.once('SIGTERM', () => {
//   console.log('Received SIGTERM, stopping bot...');
//   bot.stop('SIGTERM');
// });

// // Launch bot
// bot.launch()
//   .then(() => {
//     console.log('✅ Bot muvaffaqiyatli ishga tushdi!');
//     console.log('Bot username:', bot.botInfo?.username);
//     console.log('Web App URL:', WEB_APP_URL);
//     console.log('API URL:', API_URL);
//   })
//   .catch((err) => {
//     console.error('❌ Bot ishga tushmadi:', err);
//     process.exit(1);
//   });

// module.exports = bot;
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
    // ['📞 Yordam', 'ℹ️ Biz haqimizda']
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
🌟 *Assalomu alaykum, ${user.first_name}!Sharq Universitet Anonim Feedback Botiga Xush Kelibsiz!*

💫 *Sizning har bir fikringiz - bu universitetimizni yanada yaxshilash imkoniyati!* 
🔒 Maxfiylik kafolati:
Shaxsiy ma’lumotlaringiz saqlanmaydi — faqat fikringiz yozib olinadi.

🎯 *Boshlash uchun "✍️ Fikr Bildirish" tugmasini bosing va o'z hissangizni qo'shing!*
    `.trim();
    await ctx.replyWithMarkdown(welcomeMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}/form?user=${user.id}`)
          ]
        ]
      }
    });


    // await ctx.replyWithMarkdown(welcomeMessage, getMainKeyboard(user.id));
  } catch (error) {
    console.error('Start command error:', error);
    await ctx.reply('❌ Kechirasiz, texnik xatolik yuz berdi. Iltimos, birozdan so\'ng qayta urinib ko\'ring yoki /start buyrug\'ini yuboring.');
  }
});

// Yordam
bot.hears('📞 Yordam', async (ctx) => {
  try {
    const helpMessage = `
🆘 *Qanday foydalanish kerak?*

🎯 *4 oson qadamda fikringizni bildiring:*

1️⃣ *"✍️ Fikr Bildirish"* tugmasini bosing
2️⃣ 📱 Ochilgan web sahifada kategoriyani tanlang
3️⃣ 📝 So'rovnomalarga javob bering (ixtiyoriy)
4️⃣ ✅ O'z fikringizni yozing va yuboring

🔐 *Maxfiylik kafolati:*
• 👤 Barcha fikrlar anonim
• 🚫 Shaxsiy ma'lumotlar saqlanmaydi
• 📊 Faqat kategoriya va matn ko'rinadi

💡 *Samarali fikr bildirish bo'yicha maslahatlar:*
• 🎯 Aniq va konstruktiv fikr bildiring
• 📈 Muammoni hal qilish bo'yicha taklif bering
• 🌱 Ijobiy o'zgartirishlarni ko'zlang
• 🤝 Hammadan foydali bo'ladigan yechimlarni taklif qiling

*📢 Eslatma:* Sizning har bir murojaatingiz universitetimizni yanada yaxshilashga sabab bo'ladi!
    `.trim();

    // await ctx.replyWithMarkdown(helpMessage);
  } catch (error) {
    console.error('Yordam error:', error);
  }
});

// Biz haqimizda
bot.hears('ℹ️ Biz haqimizda', async (ctx) => {
  try {
    const aboutMessage = `
🏫 *Biz haqimizda*

🎯 *Maqsadimiz:* Talaba va professor-o'qituvchilarning universitet hayotiga oid fikrlarini anonim tarzda to'plash va ular asosida yaxshilash ishlarini amalga oshirish.

🌟 *Qadriyatlarimiz:*
• 💬 Ochiqlik va shaffoflik
• 👂 Har bir ovozni eshitish
• 📊 Ma'lumotlar asosida qaror qabul qilish
• 🔄 Doimiy takomillashtirish

📊 *Statistika:*
• 🗣️ 500+ fikr-mulohaza
• ✅ 150+ amalga oshirilgan taklif
• ⭐ 4.8/5 foydalanuvchilar bahosi

🤝 *Jamoa:* Biz - universitet jamoasining faol a'zolari bo'lib, yaxshilikka intilayotgan mutaxassislardan iborat jamoa.

*🎉 Sizning har bir taklifingiz bizga yangi imkoniyatlar ochib beradi!*
    `.trim();

    // await ctx.replyWithMarkdown(aboutMessage);
  } catch (error) {
    console.error('Biz haqimizda error:', error);
  }
});

// Text handler
bot.on('text', async (ctx) => {
  try {
    if (!ctx.message.text.startsWith('/')) {
      const unknownMessage = `
🤔 Kechirasiz, men sizning so'rovingizni tushunmadim.

💡 *Mavjud buyruqlar:*
• "✍️ Fikr Bildirish" - Yangi fikr qoldirish
• "📞 Yordam" - Qo'llanma va ko'rsatmalar  
• "ℹ️ Biz haqimizda" - Loyiha haqida ma'lumot

🎯 Agar sizda universitetimizni yaxshilash bo'yicha taklif yoki fikr bo'lsa, "✍️ Fikr Bildirish" tugmasini bosing!
      `.trim();

      await ctx.replyWithMarkdown(unknownMessage, getMainKeyboard(ctx.from.id));
    }
  } catch (error) {
    console.error('Text handler error:', error);
  }
});

// Callback query handler
bot.on('callback_query', async (ctx) => {
  try {
    await ctx.answerCbQuery('⏳ Ishlanmoqda...');
    const data = ctx.callbackQuery.data;

    if (data === 'view_categories') {
      const categoriesMessage = `
📚 *Mavjud kategoriyalar:*

💡 *Takliflar* - Yangi g'oyalar, loyihalar va takliflar
⚠️ *Shikoyatlar* - Muammolar, kamchiliklar va noqulayliklar
📖 *Dars jarayoni* - O'quv materiallari, metodika, baholash
🏛️ *Infratuzilma* - Binolar, jihozlar, auditoriyalar, laboratoriyalar
💭 *Boshqa fikrlar* - Barcha qolgan mavzular

🎯 *Har bir kategoriya alohida e'tiborga olinadi va tahlil qilinadi!*

🌐 Web ilovani ochish uchun quyidagi tugmani bosing:
      `.trim();

      await ctx.editMessageText(categoriesMessage, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('🚀 Fikr Bildirishni Boshlash', `${WEB_APP_URL}?user=${ctx.from.id}`)],
          [Markup.button.callback('🔙 Orqaga', 'back_to_main')]
        ])
      });
    }

    if (data === 'back_to_main') {
      await ctx.editMessageText(
        '👋 Asosiy menyuga qaytdingiz. Quyidagi tugmalardan birini tanlang:',
        {
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard([
            [Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}?user=${ctx.from.id}`)],
            [Markup.button.callback('📞 Yordam', 'help'), Markup.button.callback('ℹ️ Biz haqimizda', 'about')]
          ])
        }
      );
    }

    if (data === 'help') {
      // Yordam messageni yuborish
      const helpMessage = `
🆘 *Qanday foydalanish kerak?*

🎯 *4 oson qadamda fikringizni bildiring:*
1️⃣ "✍️ Fikr Bildirish" tugmasini bosing
2️⃣ Kategoriyani tanlang
3️⃣ So'rovnomalarga javob bering
4️⃣ Fikringizni yozing va yuboring

💡 *Eslatma:* Sizning har bir murojaatingiz universitetimizni yanada yaxshilashga sabab bo'ladi!
      `.trim();

      await ctx.editMessageText(helpMessage, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('✍️ Fikr Bildirishni Boshlash', `${WEB_APP_URL}?user=${ctx.from.id}`)],
          [Markup.button.callback('🔙 Orqaga', 'back_to_main')]
        ])
      });
    }

    if (data === 'about') {
      // Biz haqimizda messageni yuborish
      const aboutMessage = `
🏫 *Biz haqimizda*

🎯 *Maqsadimiz:* Talaba va professor-o'qituvchilarning universitet hayotiga oid fikrlarini anonim tarzda to'plash.

🌟 *Sizning fikringiz biz uchun muhim!*
📊 Har bir taklif diqqat bilan o'rganiladi va imkoniyat doirasida amalga oshiriladi.

🤝 *Keling, birgalikda universitetimizni yanada yaxshiroq qilaylik!*
      `.trim();

      await ctx.editMessageText(aboutMessage, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.webApp('🎯 Fikr Bildirish', `${WEB_APP_URL}?user=${ctx.from.id}`)],
          [Markup.button.callback('🔙 Orqaga', 'back_to_main')]
        ])
      });
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
    ctx.reply('❌ Kechirasiz, texnik xatolik yuz berdi. Iltimos, birozdan so\'ng qayta urinib ko\'ring yoki /start buyrug\'ini yuboring.');
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