export interface HttpMetadataResponse {
  timestamp: number;
  path: string;
  version: string;
}

export interface HttpResponse<T> {
  statusCode: number;
  message: string;
  metadata: HttpMetadataResponse;
  data: T;
  ok: boolean;
}

export interface HttpResponseError {
  statusCode: number;
  message: string;
  error: string | string[];
  metadata: HttpMetadataResponse;
  ok: boolean;
}
