import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';

    const page = +(query.get('page') ?? 1);

    const { data } = await axios.get(`/api/posts`, {
      params: {
        locale,
        'sort[0]': 'createdAt:desc',
        'populate[0]': 'image',
        'populate[1]': 'tags',
        'pagination[page]': page,
        'pagination[pageSize]': 6,
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
        posts: data.data.map((e: any) => ({
          id: e.id,
          title: e.attributes.title,
          description: e.attributes.description,
          category: e.attributes.category,
          image: env.CMS_URL + e.attributes.image.data.attributes.url,
          content: e.attributes.content,
          video: e.attributes.video,
          tags: e.attributes.tags.data.map((tag: any) => ({
            id: tag.id,
            title: tag.attributes.title,
            color: tag.attributes.color,
          })),
        })),
        total: data.meta.pagination.total,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
