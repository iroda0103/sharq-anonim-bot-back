// const { Telegraf, Markup } = require('telegraf');
// const express = require('express');
// const cors = require('cors');
// const config = require("./config");
// const router = require('./router');
// const service = require('./service');
// const axios = require('axios');

// const app = express();
// const bot = new Telegraf(config.tg.botToken);

// app.use(express.json());
// app.use(cors());
// app.use(router);

// bot.catch((err, ctx) => {
//   console.error(`Error for user ${ctx.from?.id}:`, err);
// });
// console.log("Bot is starting...");

// // Start command
// bot.start((ctx) => service.botStart(ctx, bot));

// bot.on('contact', (ctx) => service.contact(ctx, bot));

// bot.command('all', (ctx) => {
//   ctx.reply('Ovqat buyurtma qiladigan botga xush kelibsiz!', Markup.keyboard([
//     [Markup.button.webApp('🛍 Buyurtma berish', 'https://eltuv.vercel.app/')],
//     ['🧾 Mening buyurtmalarim']
//   ]).resize());
// });

// bot.hears('🧾 Mening buyurtmalarim', (ctx) => service.myOrder(ctx));
// bot.hears('☎️ Qo‘llab-quvvatlash', async (ctx) => {
//   await ctx.reply('📞 Qoʻllab-quvvatlash xizmati: +998 88 111 38 21\n' +
//     'Ish vaqti: 09:00 - 18:00');
// });

// bot.command('address', async (ctx) => {
//   ctx.reply('🍽 Taom buyurtma qilish uchun manzilingizni yuboring:', {
//     reply_markup: {
//       keyboard: [
//         [{ text: 'Lokatsiyani yuborish', request_location: true }]
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true
//     }
//   });
// });

// // Improved order handling
// bot.on('message', async (msg) => {
//   if (msg.webAppData) {
//     try {
//       const data = JSON.parse(msg.webAppData.data.text());
//       console.log("Web App'dan kelgan data:", data);

//       // Validate required fields
//       if (!data.items || data.items.length === 0) {
//         return msg.reply('❌ Savatchangiz bo\'sh. Iltimos, avval mahsulot tanlang.');
//       }

//       if (data.isDelivery && !data.address) {
//         return msg.reply('❌ Yetkazib berish uchun manzil kiritilmagan.');
//       }

//       // Prepare order data for API
//       const orderData = {
//         id: data.id,
//         clientId: data.user?.id || msg.from.id,
//         clientName: data.user?.name || `${msg.from.first_name} ${msg.from.last_name || ''}`.trim(),
//         clientPhone: data.user?.phone || data.address?.phone,
//         restaurantId: data.restaurantId || 1, // Default or from data
//         items: data.items.map(item => ({
//           productId: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity
//         })),
//         deliveryType: data.deliveryType,
//         totalPrice: data.totalPrice,
//         deliveryPrice: data.deliveryPrice || (data.isDelivery ? 10000 : 0),
//         paymentMethod: data.paymentMethod || 'cash',
//         status: 'pending',
//         createdAt: new Date().toISOString()
//       };

//       // 2. Notify user
//       await msg.reply(`✅ Sizning #${orderData.id} raqamli buyurtmangiz qabul qilindi!\n` +
//         (data.deliveryType == 'delivery' ? 'Haydovchilar qidirilyapti, iltimos kuting...' : 'Buyurtmangiz tayyor bo\'lganda olib ketishingiz mumkin.'));

//       // 3. If delivery, find and notify drivers
//       if (data.deliveryType == 'delivery') {
//         try {
//           const driversResponse = await axios.get('https://api.suvtekin.uz/users?role=driver');
//           const drivers = driversResponse.data;

//           if (!drivers || !Array.isArray(drivers)) {
//             throw new Error('Haydovchilar ma\'lumoti topilmadi yoki array emas');
//           }

//           const orderDetails = data.items.map(item =>
//             `- ${item.name} x ${item.quantity} (${item.price} so'm)`
//           ).join('\n');

//           const messageText = `📦 Yangi buyurtma #${orderData.id}:\n${orderDetails}\n\n` +
//             `📍 Manzil: ${data.address.full}\n` +
//             `📞 Telefon: ${orderData.clientPhone}\n` +
//             `💵 Umumiy narx: ${orderData.totalPrice} so'm (yetkazish: ${orderData.deliveryPrice} so'm)`;

//           for (const driver of drivers) {
//             if (driver.telegramId) {
//               try {
//                 await bot.telegram.sendMessage(
//                   driver.telegramId,
//                   messageText,
//                   {
//                     reply_markup: {
//                       inline_keyboard: [
//                         [{
//                           text: "✅ Buyurtmani qabul qilish",
//                           callback_data: `accept_${orderData.id}_${msg.chat.id}_${driver.id}`
//                         }]
//                       ]
//                     }
//                   }
//                 );
//               } catch (err) {
//                 console.error(`Haydovchiga xabar yuborishda xato (ID: ${driver.telegramId}):`, err.message);
//               }
//             }
//           }
//         } catch (err) {
//           console.error('Haydovchilarni topishda xato:', err);
//           await msg.reply('⚠️ Haydovchilarni topishda muammo yuz berdi. Iltimos, birozdan keyin qayta urunib ko\'ring.');
//         }
//       }

//     } catch (err) {
//       console.error('Xatolik yuz berdi:', err);
//       await msg.reply('❌ Buyurtmani qayta ishlashda xatolik yuz berdi. Iltimos, qayta urunib ko\'ring.');
//     }
//   }
// });

// // Improved order acceptance
// bot.on('callback_query', async (ctx) => {
//   try {
//     const callbackData = ctx.callbackQuery.data;
//     console.log('Callback data:', callbackData);

//     if (callbackData.startsWith('accept_')) {
//       const [_, orderId, clientChatId, driverId] = callbackData.split('_');
//       console.log('test', driverId, {
//         driverId: +driverId,
//         status: 'confirmed',
//         // acceptedAt: new Date().toISOString()
//       });

//       // 1. Update order in database
//       try {
//         await axios.patch(`http://localhost:3002/orders/${orderId}`, {
//           driverId: +driverId,
//           status: 'confirmed',
//           // acceptedAt: new Date().toISOString()
//         });
//       } catch (err) {
//         console.error('Order update error:', err.response?.data || err.message);
//         return ctx.answerCbQuery('❌ Buyurtmani yangilashda xatolik');
//       }

//       // 2. Notify driver
//       await ctx.telegram.sendMessage(
//         ctx.from.id,
//         `✅ Siz #${orderId} raqamli buyurtmani qabul qildingiz!\n` +
//         `Mijoz: ${ctx.callbackQuery.message.text.split('\n')[2]?.replace('📞 Telefon: ', '') || 'Noma\'lum'}\n` +
//         `Yetkazish manzili: ${ctx.callbackQuery.message.text.split('\n')[1]?.replace('📍 Manzil: ', '') || 'Noma\'lum'}`
//       );

//       // 3. Notify client
//       await ctx.telegram.sendMessage(
//         clientChatId,
//         `🚗 Haydovchi ${ctx.callbackQuery.from.first_name} buyurtmangizni qabul qildi!\n` +
//         `Buyurtma raqami: #${orderId}\n` +
//         `Haydovchi siz bilan tez orada bog'lanadi.`
//       );

//       // 4. Remove inline keyboard
//       await ctx.editMessageReplyMarkup({ inline_keyboard: [] });

//       await ctx.answerCbQuery();
//     }
//   } catch (err) {
//     console.error('Callback queryda xato:', err);
//     await ctx.answerCbQuery('❌ Xatolik yuz berdi, qayta urinib ko\'ring');
//   }
// });

// // Location handling
// bot.command('location', (ctx) => {
//   ctx.reply('📍 Manzilingizni yuboring:', {
//     reply_markup: {
//       keyboard: [
//         [{ text: 'Lokatsiyani yuborish', request_location: true }]
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true
//     }
//   });
// });

// bot.on('location', (ctx) => {
//   const location = ctx.message.location;
//   // Here you would typically save the location to user's profile
//   ctx.reply('✅ Manzilingiz saqlandi. Endi taom tanlang!', Markup.inlineKeyboard([
//     Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')
//   ]));
// });

// // Start bot and server
// service.startBot(bot).catch(console.error);

// app.listen(config.port || 3030, () => {
//   console.log(`🚀 Server running on http://localhost:${config.port || 3030}`);
// });
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const config = require("./config");
const bot = new Telegraf(config.tg.botToken);
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://frontend-delta-lyart-82.vercel.app';
// const WEB_APP_URL = process.env.WEB_APP_URL || 'https://eltuv.vercel.app/';
// bot.js
// const { Telegraf, Markup } = require('telegraf');
// const axios = require('axios');

// Config
// const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN';
// const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:5173';
// const API_URL = process.env.API_URL || 'http://localhost:3000';

// const bot = new Telegraf(BOT_TOKEN);

// Helper function - keyboard
const getMainKeyboard = (userId) => {
  return Markup.keyboard([
    [Markup.button.webApp('✍️ Fikr Bildirish', `${WEB_APP_URL}?user=${userId}`)],
    ['📊 Statistika', 'ℹ️ Yordam']
  ]).resize();
};

// Start command
bot.start(async (ctx) => {
  const user = ctx.from;
  console.log(user);
  
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
  const result_user=await axios.post(`${config.apiUrl}/api/users`, {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    telegram_id: ctx.from.id,
    username: ctx.from.username,
    language_code: ctx.from.language_code
  });
  
  console.log(result_user);

  await ctx.replyWithMarkdown(welcomeMessage, getMainKeyboard(user.id));
});

// Statistika
bot.hears('📊 Statistika', async (ctx) => {
  try {
    const response = await axios.get(`${API_URL}/api/stats`);
    const stats = response.data;

    const message = `
📊 *Umumiy Statistika*

✅ Jami fikrlar: *${stats.totalFeedbacks || 0}* ta
📝 Bugungi fikrlar: *${stats.todayFeedbacks || 0}* ta
📈 Haftalik fikrlar: *${stats.weeklyFeedbacks || 0}* ta

🏆 *Eng faol kategoriya:* ${stats.topCategory || 'Ma\'lumot yo\'q'}

Rahmat, sizning fikringiz biz uchun muhim! 🙏
    `.trim();

    await ctx.replyWithMarkdown(message);
  } catch (error) {
    console.error('Stats error:', error);
    await ctx.reply('❌ Statistikani yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
  }
});

// Yordam
bot.hears('ℹ️ Yordam', async (ctx) => {
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

📞 *Savol yoki muammo?*
Administrator bilan bog'laning: @admin_username

💡 *Maslahat:* Aniq va konstruktiv fikr bildiring, bu universitetni yaxshilashga yordam beradi!
  `.trim();

  await ctx.replyWithMarkdown(helpMessage);
});

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