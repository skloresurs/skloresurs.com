import { env } from "@/env.mjs";
import type IReporting from "@/types/Reporting";
import axios from "@/utils/axios-cms";

interface IReportingServer {
  attributes: {
    auditory: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    finance: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    year: number;
  };
}
/**
 * Retrieves the reportings from the API.
 *
 * @return {Promise<IReporting[] | null>} The retrieved reportings, or null if an error occurred.
 */
export default async function getReportings(): Promise<IReporting[] | null> {
  try {
    const { data } = await axios.get("/api/reportings", {
      params: {
        populate: "*",
        "sort[0]": "year:desc",
      },
    });
    return data.data.map((e: IReportingServer) => ({
      auditory: env.CMS_URL + e.attributes.auditory.data.attributes.url,
      finance: env.CMS_URL + e.attributes.finance.data.attributes.url,
      year: e.attributes.year,
    }));
  } catch (error) {
    return null;
  }
}
