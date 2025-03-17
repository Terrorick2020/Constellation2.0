export interface ProfileInventoryDescriptionProps {
  indexPage?: boolean
  link?: string
  subscribers: string
  views: string
  er?: string
  promotions?: {
    title: string
    description: string
  }[]
}

export type TypesAdverstingsPropsType = Pick<ProfileInventoryDescriptionProps, 'promotions'>
