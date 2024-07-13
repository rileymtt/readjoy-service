import * as Enums from "config/enums";
import winstonLogger from "loggers/winston.logger";
import moment from "moment";
import * as Format from "./format";
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

function sleep(sec: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });
}

export function randomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Helper = {
  Enums,
  bcrypt,
  validation: {
    validationResult,
  },
  Format,
  sleep,
};

export function sendTelegramMonitor(
  messages: string[],
  chatId: string = "sp_service_health_check"
) {
  try {
    let text = ``;
    messages.map((item: string) => {
      text += `${item} %0A`;
    });
    let addMessageThread = ``;
    if (chatId === "sp_service_health_check") {
      addMessageThread = `&message_thread_id=1370`;
    }
    const url = `https://api.telegram.org/bot1422791231:AAGCF6JHMivLuL-G2KjMwyZBhMSaAI4fzR0/sendMessage?chat_id=@${chatId}${addMessageThread}&text=${text}`;
    fetch(url).catch((e) => console.log(e));
  } catch (error) {
    winstonLogger.error({
      label: "sendMonitor",
      message: JSON.stringify(error),
    });
  }
}

export function getUTCDate(time: any) {
  return moment(time).utc().format("YYYY-MM-DD");
}

export function getNowUTCDate() {
  return moment().utc().format("YYYY-MM-DD");
}
