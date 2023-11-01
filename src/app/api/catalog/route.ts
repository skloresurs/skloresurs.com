import { type NextRequest, NextResponse } from 'next/server';

import type IProduct from '@/types/Product';
import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';
    const category = query.get('category') ?? 'exterior';

    const { data } = await axios.get(`/api/products`, {
      params: {
        locale,
        'filters[category][$eqi]': category,
      },
    });
    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      data.data.map(
        (e: any) =>
          ({
            id: e.id,
            title: e.attributes.title,
            category: e.attributes.category,
            content: e.attributes.content,
          }) as IProduct,
      ),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
