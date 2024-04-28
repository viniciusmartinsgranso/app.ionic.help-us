export interface CreateUserPayload {
  name: string;
  email: string;
  city: string;
  password: string;
}

export interface RegisterPayload extends CreateUserPayload {
  confirmPassword: string;
}
