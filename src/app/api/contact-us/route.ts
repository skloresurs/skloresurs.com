import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];
const {
  SPREADSHEET_ID,
  RECAPTCHA_SECRET,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
} = env;
const TELEGRAM_API_ROUTE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

const missingOptionalParams = 'Не вказано';

function GenerateTelegramMessage(username: string, email: string, phone: string | null, message: string) {
  return `🔔 Нове сповіщення з сайту
🧑 Від: ${username}
📧 E-mail: ${email}
📞 Номер телефону: ${phone ?? missingOptionalParams}

💬 Повідомлення:
${message}`;
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, phone, message, additional, captcha } = await request.json();

    const { data } = await axios
      .post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captcha}`)
      .catch(() => ({ data: { success: false } }));
    if (!data.success) {
      return NextResponse.json(
        { error: 'Captcha failed' },
        {
          status: 429,
        }
      );
    }

    if (!username || !email || !message) {
      return NextResponse.json(
        {
          error: 'Missing one or many required fields',
        },
        { status: 400 }
      );
    }

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const jwt = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: SCOPES,
    });
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID ?? '', jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Відгуки'];
    await sheet?.addRow({
      'E-mail': email,
      "Ім'я": username,
      Дата: `${dayjs.tz(new Date(), 'Europe/Kyiv').format('DD.MM.YYYY HH:mm')}`,
      'Номер телефону': `'${phone?.toString() ?? missingOptionalParams}`,
      Повідомлення: message.replace('=', '≈'),
      'Як дізнались': additional ?? missingOptionalParams,
    });

    const { data: createTopicResponse } = await axios.post(`${TELEGRAM_API_ROUTE}/createForumTopic`, {
      chat_id: TELEGRAM_CHAT_ID,
      name: `${username} ${dayjs.tz(new Date(), 'Europe/Kyiv').format('DD.MM.YYYY HH:mm')}`,
    });

    await axios.post(`${TELEGRAM_API_ROUTE}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      message_thread_id: createTopicResponse.result.message_thread_id,
      text: GenerateTelegramMessage(username, email, phone, message),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unknown error',
      },
      { status: 500 }
    );
  }
}
