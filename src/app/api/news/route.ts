import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import type IPostExtended from '@/types/Post';
import axios from '@/utils/axios-cms';

interface INewsServer {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    category: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    tags: {
      data: INewsTagServer[];
    };
    video: string;
    createdAt: string;
  };
}

interface INewsTagServer {
  id: number;
  attributes: {
    title: string;
    color: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';

    const page = +(query.get('page') ?? 1);

    const { data } = await axios.get(`/api/posts`, {
      params: {
        locale,
        'pagination[pageSize]': 6,
        'pagination[page]': page,
        populate: '*',
        'sort[0]': 'createdAt:desc',
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
        posts: data.data.map(
          (news: INewsServer) =>
            ({
              category: news.attributes.category,
              content: news.attributes.content,
              description: news.attributes.description,
              id: news.id,
              image: env.CMS_URL + news.attributes.image.data.attributes.url,
              tags: news.attributes.tags.data.map((tag) => ({
                color: tag.attributes.color,
                id: tag.id,
                title: tag.attributes.title,
              })),
              title: news.attributes.title,
              video: news.attributes.video,
            }) as IPostExtended
        ) as IPostExtended[],
        total: data.meta.pagination.total,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
