import { type NextRequest, NextResponse } from 'next/server';

import { env } from '@/env.mjs';
import axios from '@/utils/axios-cms';

interface IProjectServer {
  id: string;
  attributes: {
    title: string;
    description: string;
    location: {
      data: {
        id: string;
        attributes: {
          title: string;
        };
      };
    };
    year: number;
    glass: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    glass_category: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    images: {
      data: IProjectImageServer[];
    };
  };
}

interface IProjectImageServer {
  attributes: {
    url: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const locale = query.get('locale') ?? 'uk';

    const location = query.get('location');
    const glass = query.get('glass');
    const yearFrom = query.get('year-from');
    const yearTo = query.get('year-to');
    const search = query.get('search');
    const page = query.get('page');

    const { data } = await axios.get(`/api/projects`, {
      params: {
        'filters[$or][0][title][$containsi]': search,
        'filters[$or][1][location][title][$containsi]': search,
        'filters[$or][2][year][$containsi]': search,
        'filters[$or][3][glass][$containsi]': search,
        'filters[glass_category][id][$in]': glass,
        'filters[location][id][$eq]': location,
        'filters[year][$gte]': yearFrom,
        'filters[year][$lte]': yearTo,
        locale,
        'pagination[pageSize]': 9,
        'pagination[page]': page,
        populate: '*',
        'sort[0]': 'year:desc',
        'sort[1]': 'title',
      },
    });

    if (!data.data) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(
      {
        data: data.data.map((project: IProjectServer) => ({
          glass: project.attributes.glass,
          id: project.id,
          images: project.attributes.images.data.map(
            (projectImage) => env.CMS_URL + projectImage.attributes.url
          ),
          location: {
            id: project.attributes.location.data.id,
            title: project.attributes.location.data.attributes.title,
          },
          title: project.attributes.title,
          year: project.attributes.year,
        })),
        meta: {
          total: data.meta.pagination.total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
