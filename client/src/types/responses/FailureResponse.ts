interface FailureResponse {
  status: number;
  message?: string;
  error: unknown;
}

export default FailureResponse;

export function isFailureResponse (response: unknown): response is FailureResponse {
  const status = (response as FailureResponse).status || undefined;

  return status !== undefined && (status < 200 || status >= 300);
}
