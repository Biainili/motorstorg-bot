const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    `Привет ${
      ctx.message.from.first_name ? ctx.message.from.first_name : "Незнакомиц"
    } ! 👋🏼 `
  )
);
bot.help((ctx) => ctx.reply(text.commands));

bot.command("manager", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: "./img/manag.jpeg" });
    await ctx.replyWithHTML("https://t.me/motorstorgfor", {
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.log(e);
  }
});

bot.command("menu", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "🔻     🔻     🔻 <b> Меню Motors Torg</b> ®️  🔻     🔻     🔻",
      Markup.inlineKeyboard(
        (arr = [
          [
            Markup.button.callback(
              "🚘   Автопарк ⬇️ ▫️ КУПИТЬ СЕЙСАС ▫️ ⬇️",
              "btn_1"
            ),
          ],
          [
            Markup.button.callback("Audi Q5 2021", "btn_1a"),
            Markup.button.callback("Mercedes GLE 2021", "btn_1b"),
            Markup.button.callback("BMW X7 2021", "btn_1c"),
          ],
          [Markup.button.callback("Авто из США 🇺🇸", "btn_2")],
          [
            Markup.button.callback("Оставить запрос на Авто ✔️", "btn_2a"),
            Markup.button.callback("Аукцион в США это... 🚘", "btn_2b"),
          ],
          [Markup.button.callback("⚙️  Запчасти", "btn_3")],
          [
            Markup.button.callback(
              "🔧  Оставить запрос на Запчасть ",
              "btn_3a"
            ),
            Markup.button.callback(
              "🔩 Коммерческие поставки запчастей ",
              "btn_3b"
            ),
          ],
          [
            Markup.button.callback(
              "📂  Услуги утчета авто в (РА) и (РФ)",
              "btn_4"
            ),
          ],
          [
            Markup.button.callback(
              `🚛  Перевозка авто и других товаров через Иран в РФ 🇷🇺`,
              "btn_5"
            ),
          ],
        ])
      )
    );
  } catch (e) {
    console.error(e);
  }
});

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

let arrAudi = [
  "./audi/1.jpg",
  "./audi/2.jpg",
  "./audi/3.jpg",
  "./audi/4.jpg",
  "./audi/5.jpg",
  "./audi/6.jpg",
];
let arrGle = [
  "./gle/1.jpeg",
  "./gle/2.jpeg",
  "./gle/3.jpeg",
  "./gle/4.jpeg",
  "./gle/5.jpeg",
  "./gle/6.jpeg",
  "./gle/7.jpeg",
  "./gle/8.jpeg",
  "./gle/9.jpeg",
  "./gle/10.jpeg",
];

let arrX7 = [
  "./x7/1.jpeg",
  "./x7/2.jpeg",
  "./x7/3.jpeg",
  "./x7/4.jpeg",
  "./x7/5.jpeg",
  "./x7/6.jpeg",
  "./x7/7.jpeg",
  "./x7/8.jpeg",
  "./x7/9.jpeg",
  "./x7/10.jpeg",
];

const forwardChatId = process.env.CHAT_ID;

bot.action("btn_1", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: "./usaa/usa1.jpeg" });
    await ctx.replyWithHTML(text.textAvtoPark, {
      disable_web_page_preview: true,
    });
    await ctx.replyWithHTML(
      text.textForButtonAvto,
      Markup.inlineKeyboard(arr[1])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("btn_3b", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: "./usaa/usa1.jpeg" });
    await ctx.replyWithHTML(text.textForP, {
      disable_web_page_preview: true,
    });
    await ctx.replyWithDocument({
      source:
        "./Комерческое Предложение от ООО РФК  Запчасти для грузавых Авто в (наличие в Москве).xlsx",
    });
  } catch (e) {
    console.error(e);
  }
});

let switchE = false;
bot.action("btn_2a", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: "./img/zakaza.jpeg" });
    await ctx.replyWithHTML(text.textForBeck);
    switchE = true;

    bot.on("text", async (ctx) => {
      const chatId = ctx.chat.id;
      const message = ctx.message.text;

      if (ctx.chat.type === "private" && switchE === true) {
        await bot.telegram.forwardMessage(
          forwardChatId,
          chatId,
          ctx.message.message_id
        );
        (await ctx.message.message_id) &&
          ctx.replyWithHTML(text.textForFormget);
        message !== undefined ? (switchE = false) : (switchE = true);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

bot.action("btn_3a", async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: "./img/zakzap.jpeg" });
    await ctx.replyWithHTML(text.textForZap);
    switchE = true;

    bot.on("text", async (ctx) => {
      const chatId = ctx.chat.id;
      const message = ctx.message.text;

      if (ctx.chat.type === "private" && switchE === true) {
        await bot.telegram.forwardMessage(
          forwardChatId,
          chatId,
          ctx.message.message_id
        );
        (await ctx.message.message_id) &&
          ctx.replyWithHTML(text.textForFormget);
        message !== undefined ? (switchE = false) : (switchE = true);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        if (Array.isArray(src)) {
          src.forEach((elem) => {
            ctx.replyWithPhoto({ source: elem });
          });
        } else {
          await ctx.replyWithPhoto({ source: src });
        }
      }
      await ctx.replyWithHTML(text, { disable_web_page_preview: true });
    } catch (e) {
      console.error(e);
    }
  });
}

addActionBot("btn_1a", arrAudi, text.textAudi);
addActionBot("btn_1b", arrGle, text.textGle);
addActionBot("btn_1c", arrX7, text.textX7);
addActionBot("btn_2", "./img/autoizusa.jpeg", text.textForAvtoIzUsa);
addActionBot("btn_2b", "./img/info.jpeg", text.aukc);
addActionBot("btn_3", "./img/zap.jpeg", text.textZap);
addActionBot("btn_4", "./img/uslugi.jpeg", text.textForUslugi);
addActionBot("btn_5", "./img/ship.jpeg", text.textForShiping);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
