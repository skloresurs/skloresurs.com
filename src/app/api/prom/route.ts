import { NextResponse } from 'next/server';

import axios from '@/utils/axios-cache';

const { PROM_API_KEY } = process.env;

export async function GET() {
  try {
    if (!PROM_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'Api key error',
        }),
      );
    }

    const { data } = await axios.get(
      'https://my.prom.ua/api/v1/products/list?limit=1000',
      {
        headers: {
          Authorization: `Bearer ${PROM_API_KEY}`,
        },
      },
    );
    return new Response(
      JSON.stringify({
        products: data.products.map((e: any) => {
          return {
            id: e.id,
            title: e.name,
            image: e.main_image,
          };
        }),
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: 'Unknown error',
      }),
      { status: 500 },
    );
  }
}
