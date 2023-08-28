const SERVER_API = import.meta.env.VITE_SERVER_API;

export type RecordListType = {
  memberId: string;
  bicycleNo: number;
};

export type RecordOneType = RecordListType & {
  recordId: number | undefined;
};

export const recordListApi = async ({
  memberId,
  bicycleNo,
}: RecordListType) => {
  const res = await fetch(
    SERVER_API +
      `/riding_record/whole_list?memberId=${memberId}&bicycleNo=${bicycleNo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data, message } = await res.json();
  console.log(message);

  return { data, status: res.status };
};

export const recordOneApi = async ({
  memberId,
  bicycleNo,
  recordId,
}: RecordOneType) => {
  const res = await fetch(
    SERVER_API +
      `/riding_record/one?memberId=${memberId}&bicycleNo=${bicycleNo}&recordId=${recordId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data, message } = await res.json();
  console.log(message);

  return { data, status: res.status };
};
