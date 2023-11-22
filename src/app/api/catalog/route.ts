import { type NextRequest, NextResponse } from 'next/server';

import axios from '@/utils/axios-cms';

interface ICatalogServer {
  id: number;
  attributes: {
    title: string;
    content: string;
    category: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';
    const category = query.get('category') ?? 'exterior';

    const { data } = await axios.get(`/api/products`, {
      params: {
        'filters[category][$eqi]': category,
        locale,
      },
    });
    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      data.data.map((e: ICatalogServer) => ({
        category: e.attributes.category,
        content: e.attributes.content,
        id: e.id,
        title: e.attributes.title,
      })),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
