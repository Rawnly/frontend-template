import { AxiosError } from 'axios';

export const isAxiosError = (e: any): e is AxiosError => 'isAxiosError' in e && e.isAxiosError;
