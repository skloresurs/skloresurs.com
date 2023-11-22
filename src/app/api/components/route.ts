import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

interface IComponentServer {
  id: number;
  attributes: {
    title: string;
    url: string;
    category: {
      data: {
        id: number;
        attributes: {
          title: string;
        };
      } | null;
    };
    image: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
    manufacturer: {
      data: {
        id: number;
        attributes: {
          title: string;
          url: string;
        };
      } | null;
    };
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';
    const category = query.get('category');
    const search = query.get('search');
    const manufacturer = query.get('manufacturer');

    const { data } = await axios.get(`/api/components`, {
      params: {
        'filters[$or][0][title][$containsi]': search,
        'filters[$or][1][category][title][$containsi]': search,
        'filters[category][id][$eq]': category,
        'filters[manufacturer][id][$eq]': manufacturer,
        locale,
        'pagination[pageSize]': 200,
        'pagination[page]': 1,
        'populate[0]': 'category',
        'populate[1]': 'image',
        'populate[2]': 'manufacturer',
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
        components: data.data.map((e: IComponentServer) => ({
          id: e.id,
          image: e.attributes.image.data?.attributes?.url
            ? env.CMS_URL + e.attributes.image.data.attributes.url
            : 'https://placehold.co/512?text=Missing\nImage/png',

          manufacturer: e.attributes.manufacturer?.data
            ? {
                id: e.attributes.manufacturer.data.id,
                title: e.attributes.manufacturer.data.attributes.title,
                url: e.attributes.manufacturer.data.attributes.url,
              }
            : null,
          title: e.attributes.title,
          url: e.attributes.url,
        })),
        total: data.meta.pagination.total,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
