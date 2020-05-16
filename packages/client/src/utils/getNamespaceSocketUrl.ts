import { API_URL } from '~/config';

export function getNamespaceSocketUrl(namespace = ''): string {
  return `${API_URL}/${namespace}`;
}
