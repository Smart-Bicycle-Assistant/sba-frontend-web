import request from './request';
import { handleApiError } from './errorHandling';

export type RecordListType = {
  bicycleId: number;
};

export type RecordOneType = {
  bicycleId: number;
  recordId: number | undefined;
};

export const RecordListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(`/riding_record/whole_list?bicycleId=${bicycleNo}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const RecordOneApi = async ({ bicycleId, recordId }: RecordOneType) => {
  try {
    const response = await request.get(
      `/riding_record/one?bicycleId=${bicycleId}&recordId=${recordId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteRecordApi = async (recordId: number) => {
  try {
    const response = await request.delete(`/riding_record/delete_entry?recordId=${recordId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
