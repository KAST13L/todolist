import { AxiosResponse } from "axios";
import { instance } from "@app/common/api/common.api";
import { ResponseType } from "@app/common/types/common.types";

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId?: string }>>
    >("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
  me() {
    return instance.get<ResponseMeType>("auth/me");
  },
};

export type ResponseMeType = ResponseType<{
  id: number;
  email: string;
  login: string;
}>;
