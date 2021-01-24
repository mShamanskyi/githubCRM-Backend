export type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse>;

export interface HttpRequest {
  body: any;
  files: any;
  query: any;
  params: any;
  ip: string;
  method: "POST" | "PUT" | "GET" | "PATCH" | "DELETE" | string; // string used because express req.method narrowed to string
  path: string;
  headers: Partial<HttpHeaders>;
  locals: {
    user?: DecodedUser
  }
}

export interface HttpHeaders {
  "Content-Type": string;
  Referer: string;
  "User-Agent": string;
}

export type StatusCode = 200 | 201 | 302 | 400 | 401 | 403 | 404 | 409 | 500 | 520 | 204 | 202 | 523;

export interface HttpResponse {
  headers: Partial<HttpHeaders>;
  body: HttpResponseBody;
  statusCode: StatusCode;
}

export interface HttpResponseBody {
  error: null | string;
  result?: any;
}

export interface DecodedUser {
  email: string;
  id: string;
}