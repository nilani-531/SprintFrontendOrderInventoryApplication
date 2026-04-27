export interface TeamMember {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  avatar: string;
  color: string;
  bgClass: string;
  modules: string[];
  endpoints: ApiEndpoint[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  summary: string;
  description: string;
  category: string;
  pathParams?: FieldDef[];
  queryParams?: FieldDef[];
  bodyFields?: FieldDef[];
}

export interface FieldDef {
  name: string;
  type: 'string' | 'number' | 'select' | 'datetime';
  label: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ApiResponse {
  success: boolean;
  data: any;
  status: number;
  message: string;
}
