import { type NextRequest, NextResponse } from 'next/server';

import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';
    const page = query.get('page') ?? 1;
    const location = query.get('location');

    const { data } = await axios.get(`/api/projects`, {
      params: {
        locale,
        'pagination[page]': page,
        'pagination[pageSize]': 8,
        'populate[0]': 'location',
        'populate[1]': 'images',
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
        'filters[location][id][$eq]': location,
      },
    });

    if (!data.data) {
      return new NextResponse(null, { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({
        data: data.data.map((e: any) => {
          return {
            id: e.id,
            title: e.attributes.title,
            location: {
              id: e.attributes.location.data.id,
              title: e.attributes.location.data.attributes.title,
            },
            glass: e.attributes.glass,
            year: e.attributes.year,
            images: e.attributes.images.data.map(
              (ee: any) => process.env.CMS_URL + ee.attributes.url,
            ),
          };
        }),
        meta: {
          total: data.meta.pagination.total,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
