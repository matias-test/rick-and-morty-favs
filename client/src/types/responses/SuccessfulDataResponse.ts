interface SuccessfulDataResponse<T> {
  status: number;
  data: T;
}

export default SuccessfulDataResponse;

export function isSuccessfulResponse<T> (response: unknown): response is SuccessfulDataResponse<T> {
  const status = (response as SuccessfulDataResponse<T>).status || undefined;

  return status !== undefined && status >= 200 && status <= 204;
}
