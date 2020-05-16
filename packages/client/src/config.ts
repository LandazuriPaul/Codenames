import { AvailableLanguages } from '@codenames/domain';

import { getApiUrl } from '~/utils/getApiUrl';

export const API_URL = getApiUrl();
export const APP_ROOT = 'root';
export const DEFAULT_LANGUAGE = AvailableLanguages.English;
export const LOGGER_PREFIX = 'codenames';
export const MASTER_VIEW_DIMMING_COEFFICIENT = 0.6;
