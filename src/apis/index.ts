const SERVER_API = import.meta.env.VITE_SERVER_API;
console.log(SERVER_API);

export type LoginType = {
  id: string;
  password: string;
};

export type RegisterType = LoginType & {
  nickname: string;
  email: string;
};

export type LogoutType = {
  id: string;
};

export const loginApi = async ({ id, password }: LoginType) => {
  const res = await fetch(SERVER_API + '/member/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      password,
    }),
  });
  const { data, message } = await res.json();
  console.log(message);

  return { data, status: res.status };
};

export const registerApi = async ({
  id,
  nickname,
  password,
  email,
}: RegisterType) => {
  const res = await fetch(SERVER_API + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      password,
      nickname,
      email,
    }),
  });
  const { data, message } = await res.json();
  console.log(message);
  return { data, status: res.status };
};
