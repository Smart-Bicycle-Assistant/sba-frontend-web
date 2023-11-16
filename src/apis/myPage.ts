import request from './request';
import { useUser } from '../store/userStore';
import { handleApiError } from './errorHandling';

const id = useUser.getState().id || 'test1';

export type RecordListType = {
  bicycleId: number;
};

export type RecordOneType = {
  bicycleId: number;
  recordId: number | undefined;
};

export const RecordListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(
      `/riding_record/whole_list?memberId=${id}&bicycleId=${bicycleNo}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const RecordOneApi = async ({ bicycleId, recordId }: RecordOneType) => {
  try {
    const response = await request.get(
      `/riding_record/one?memberId=${id}&bicycleId=${bicycleId}&recordId=${recordId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
