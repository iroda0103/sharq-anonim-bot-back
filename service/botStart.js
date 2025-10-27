const { Markup } = require('telegraf');
const axios = require('axios');

const botStart = async (ctx) => {
  console.log('ddddddd');
  
  const telegramUser = ctx.from;
  console.log(telegramUser);
  
  let message = `👋 Assalomu alaykum ${telegramUser.first_name}!

 Bizning anonim botga xush kelibsiz. Bu yerda siz o'zingiz haqingizda ma'lumot bermasdan,savollarga javob berishingiz so'raladi`;
  console.log('ishladi');

  try {
    const response = await axios.get(`https://api.suvtekin.uz/users/tg?telegramId=${telegramUser.id}`);
    // const response = await axios.get(`http://localhost:3002/users/tg?telegramId=${telegramUser.id}`);
    // const response = await axios.get(`https://dastavka.onrender.com/users/tg?telegramId=${telegramUser.id}`);
    const user = response.data; // Backend `findOne` bitta obyekt yoki {} qaytaryapti

    console.log('Telegram ID:', telegramUser.id, 'User:', user);

    if (!user || Object.keys(user).length === 0) {
      // Foydalanuvchi topilmagan
      message += `\n\n📲 Davom etish uchun, iltimos telefon raqamingizni yuboring:`;

      await ctx.reply(message,
        Markup.keyboard([
          Markup.button.contactRequest('📱 Telefon raqamni yuborish')
        ])
          .oneTime()
          .resize()
      );
    } else {
      // Foydalanuvchi mavjud — menyuni ko‘rsatamiz
      await ctx.reply(message,
        Markup.keyboard([
          ['🧾 Mening buyurtmalarim', '☎️ Qo‘llab-quvvatlash'],
          [Markup.button.webApp('🍽 Taom buyurtma qilish', 'https://eltuv.vercel.app/')]
        ]).resize()
      );
    }
  } catch (error) {
    // if (error.response.status == 404) {
      message += `\n\n📲 Davom etish uchun, iltimos telefon raqamingizni yuboring:`;

      await ctx.reply(message,
        Markup.keyboard([
          Markup.button.contactRequest('📱 Telefon raqamni yuborish')
        ])
          .oneTime()
          .resize()
      );
    // } else {
    //   console.error('❌ Error in botStart:', error.message);
    //   await ctx.reply("❗️ Kechirasiz, server bilan bog‘lanishda xatolik yuz berdi. Keyinroq urinib ko‘ring.");
    // }
  }

};

module.exports = botStart;
