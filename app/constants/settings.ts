export const MAX_DESCRIPTION_WIDTH = 512;

export const MAX_DESCRIPTOR_WIDTH = 24;

export const MAX_MEDIA_COUNT = 3;

export const URL_PREFIX = 'collaba.pro/u/';

export type TagItem = {
    value: string;
    label: string;
}

export const AGE_GROUPS: TagItem[] = [
    { value: '18', label: 'до 18' },
    { value: '18-25', label: '18-25' },
    { value: '25-35', label: '25-35' },
    { value: '35-45', label: '35-45' },
    { value: '55', label: '55+' }
]

export const PRICE_GROUPS: TagItem[] =[
    { value: 'economy', label: 'Эконом' },
    { value: 'standard', label: 'Средний' },
    { value: 'business', label: 'Бизнес' },
    { value: 'premium', label: 'Премиум' },
    { value: 'luxury', label: 'Люкс' },
    { value: 'elite', label: 'Элитный' }
  ]