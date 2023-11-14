import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import type IComponent from '@/types/Component';
import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';
    const category = query.get('category');
    const search = query.get('search');

    const { data } = await axios.get(`/api/components`, {
      params: {
        locale,
        'pagination[page]': 1,
        'pagination[pageSize]': 100,
        'populate[0]': 'category',
        'populate[1]': 'image',
        'filters[category][id][$eq]': category,
        'filters[$or][0][title][$containsi]': search,
        'filters[$or][1][category][title][$containsi]': search,
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
        components: data.data.map(
          (e: any) =>
            ({
              id: e.id,
              title: e.attributes.title,
              description: e.attributes.description,
              href: e.attributes.link,
              category: {
                id: e.attributes.category.data.id,
                title: e.attributes.category.data.attributes.title,
              },
              image: env.CMS_URL + e.attributes.image.data.attributes.url,
            }) as IComponent,
        ) as IComponent[],
        total: data.meta.pagination.total,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
