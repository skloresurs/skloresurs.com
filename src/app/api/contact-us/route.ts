import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import axios from '@/utils/axios-cms';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];
const {
  SPREADSHEET_ID,
  RECAPTCHA_SECRET,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  TELEGRAM_BOT_TOKEN,
} = process.env;
const TELEGRAM_API_ROUTE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
const TELEGRAM_USERS = process.env.TELEGRAM_USERS?.split(',') ?? [];

const missingOptionalParams = 'Не вказано';

function GenerateTelegramMessage(
  username: string,
  email: string,
  phone: string | null,
  message: string,
) {
  return `🔔 Нове сповіщення з сайту
🧑 Від: ${username}
📧 E-mail: ${email}
📞 Номер телефону: ${phone ?? missingOptionalParams}

💬 Повідомлення:
${message}`;
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, phone, message, additional, captcha } =
      await request.json();

    const { data } = await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${captcha}`,
      )
      .catch(() => {
        return { data: { success: false } };
      });
    if (!data.success) {
      return new Response(JSON.stringify({ error: 'Captcha failed' }), {
        status: 429,
      });
    }

    if (!username || !email || !message) {
      return new NextResponse(
        JSON.stringify({
          error: 'Missing one or many required fields',
        }),
        { status: 400 },
      );
    }

    const jwt = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: SCOPES,
    });
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID ?? '', jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Відгуки'];
    await sheet?.addRow({
      Дата: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      'E-mail': email,
      "Ім'я": username,
      'Номер телефону': phone?.toString() ?? missingOptionalParams,
      'Як дізнались': additional ?? missingOptionalParams,
      Повідомлення: message.replace('=', '≈'),
    });

    for (const user of TELEGRAM_USERS ?? []) {
      axios
        .post(TELEGRAM_API_ROUTE, {
          chat_id: user,
          text: GenerateTelegramMessage(username, email, phone, message),
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Переглянути всі відгуки',
                  url: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`,
                },
              ],
            ],
          },
        })
        .catch(() => {
          return NextResponse.json(null, {
            status: 400,
          });
        });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: 'Unknown error',
      },
      { status: 500 },
    );
  }
}
