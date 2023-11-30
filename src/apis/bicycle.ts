import request from './request';
import { handleApiError } from './errorHandling';

export type BicycleRegistrationType = {
  name: string;
  image: string;
  registerTime: number;
};

export const BicycleRegistrationApi = async ({
  name,
  image,
  registerTime,
}: BicycleRegistrationType) => {
  try {
    const response = await request.post('/management_record/register_bicycle', {
      bicycleName: name,
      bicycleImage: image,
      registerTime: registerTime,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export type ManagementType = {
  bicycleId: number;
  frontTire: number;
  rearTire: number;
  brakes: number;
  chain: number;
  gears: number;
  frontTireLife: number;
  rearTireLife: number;
  managementTime: number;
};

export const BicycleManagementApi = async (params: ManagementType) => {
  try {
    const response = await request.post('/management_record/post', params);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const GetBicycleListApi = async () => {
  try {
    const response = await request.get('/management_record/get_bicycle_list');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const BicycleManageListApi = async (bicycleNo: number) => {
  try {
    const response = await request.get(`/management_record/whole_list?bicycleId=${bicycleNo}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getManagementDetailApi = async ({
  bicycleId,
  recordId,
}: {
  bicycleId: number;
  recordId: number;
}) => {
  try {
    const response = await request.get(
      `/management_record/one?bicycleId=${bicycleId}&recordId=${recordId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteBicycleApi = async (bicycleId: number) => {
  try {
    const response = await request.delete(`delete_bicycle?bicycleId=${bicycleId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteManagementApi = async (recordId: number) => {
  try {
    const response = await request.delete(`/management_record/delete_entry?recordId=${recordId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
