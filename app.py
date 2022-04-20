#!/usr/bin/env python
import os
import logging

from telegrambot.credentials import TELEGRAM_API_KEY

from telegram import Update, ForceReply, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext, CallbackQueryHandler

TOKEN = TELEGRAM_API_KEY
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    update.message.reply_markdown_v2(
        fr'Olá {user.mention_markdown_v2()}\!', reply_markup=ForceReply(selective=True)
    )


def echo(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(update.message.text)


def help(update: Update, context: CallbackContext) -> None:
    commands = [
        {"command": '/echo something', "description": 'Repeat what you said'},
        {"command": '/indra_colors', "description": 'Indra Palette Colors'},
        {"command": '/minsait_colors', "description": 'Minsait Palette Colors'}
    ]

    for index in range(len(commands)):
        update.message.reply_text('{} - {}'.format(commands[index]["command"], commands[index]["description"]))


def indra_colors(update: Update, context: CallbackContext) -> None:
    update.message.reply_photo(photo=open('images/indra-paleta-principal.png', 'rb'), caption="Paleta Principal")
    update.message.reply_photo(photo=open('images/indra-paleta-secundaria.png', 'rb'), caption="Paleta Secundária")


def minsait_colors(update: Update, context: CallbackContext) -> None:
    update.message.reply_photo(photo=open('images/minsait-paleta-principal.png', 'rb'), caption="Paleta Principal")
    update.message.reply_photo(photo=open('images/minsait-paleta-secundaria.png', 'rb'), caption="Paleta Secundária")


def main():
    updater = Updater(TOKEN)
    dispatcher = updater.dispatcher

    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CommandHandler("echo", echo))
    dispatcher.add_handler(CommandHandler("help", help))
    dispatcher.add_handler(CommandHandler("indra_colors", indra_colors))
    dispatcher.add_handler(CommandHandler("minsait_colors", minsait_colors))
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, echo))

    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()


# pm2 start app.py --name "pytelegrambot" --interpreter=./venv/bin/python
