import request from "./request";
import { handleApiError } from "./errorHandling";

export type RecordListType = {
  bicycleNo: number;
};

export type RecordOneType = {
  bicycleNo: number;
  recordId: number | undefined;
};

export const RecordListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(
      `/riding_record/whole_list?&bicycleNo=${bicycleNo}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const RecordOneApi = async ({ bicycleNo, recordId }: RecordOneType) => {
  try {
    const response = await request.get(
      `/riding_record/one?&bicycleNo=${bicycleNo}&recordId=${recordId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
