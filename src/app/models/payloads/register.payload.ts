export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterPayload extends CreateUserPayload {
  city: string;
  confirmPassword: string;
}
