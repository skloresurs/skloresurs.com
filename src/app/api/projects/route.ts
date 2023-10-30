import { type NextRequest, NextResponse } from 'next/server';

import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';

    const location = query.get('location');
    const glass = query.get('glass');
    const yearFrom = query.get('year-from');
    const yearTo = query.get('year-to');
    const search = query.get('search');

    const { data } = await axios.get(`/api/projects`, {
      params: {
        locale,
        'pagination[pageSize]': 100,
        'populate[0]': 'location',
        'populate[1]': 'images',
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
        'filters[location][id][$eq]': location,
        'filters[glass_category][id][$in]': glass,
        'filters[year][$gte]': yearFrom,
        'filters[year][$lte]': yearTo,
        'filters[$or][0][title][$containsi]': search,
        'filters[$or][1][location][title][$containsi]': search,
        'filters[$or][2][year][$containsi]': search,
        'filters[$or][3][glass][$containsi]': search,
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
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
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
