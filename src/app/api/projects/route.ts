import { type NextRequest, NextResponse } from 'next/server';

import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = await request.nextUrl.searchParams;
    const locale = query.get('locale') || 'uk';
    const page = query.get('page') || 1;

    const { data } = await axios.get(`/api/projects`, {
      params: {
        locale,
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
        'populate[0]': 'images',
        'pagination[pageSize]': 8,
        'pagination[page]': page,
      },
    });
    if (!data.data[0]) {
      return new NextResponse(null, { status: 404 });
    }
    return new NextResponse(
      JSON.stringify(
        data.data.map((e: any) => {
          return {
            id: e.id,
            title: e.attributes.title,
            location: e.attributes.location,
            glass: e.attributes.glass,
            year: e.attributes.year,
            images: e.attributes.images.data.map(
              (ee: any) => process.env.CMS_URL + ee.attributes.url,
            ),
          };
        }),
      ),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
