import type { IManufacturer } from '@/types/Component';
import axios from '@/utils/axios-cms';

interface IComponentManufacturerServer {
  id: number;
  attributes: {
    title: string;
    url: string;
  };
}

export default async function getComponentManufacturers(locale: string): Promise<IManufacturer[] | null> {
  try {
    const { data } = await axios.get('/api/component-manufacturers', {
      params: { locale },
    });

    return data.data.map((e: IComponentManufacturerServer) => ({
      id: e.id,
      title: e.attributes.title,
      url: e.attributes.url,
    }));
  } catch (error) {
    return null;
  }
}
