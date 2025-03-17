import type { PITags } from './header'
import type { PIImages } from './media'
import type { PITermsTags } from './terms'
import type {
    PIAudienceAge,
    PIAudienceGeo,
    PIAudienceSegmentTags,
    PIAudienceInteresTags,
} from './audience'


export interface ApiRegion {
    id: number
    name: string
    slug: string
    region_code: string
    region_type: {
        id: number
        name: string
    }
}

export interface ApiCities {
    id: number
    name: string
    slug: string
}

export interface ProfileInfo {
    name: string
    organization: string
    logo: string
    views: number
    previewImage: string
    description: string
    tags: PITags[]
    location: string
    site: string
    audience: {
      man: string
      woman: string
      age: PIAudienceAge[]
      geo_tags: PIAudienceGeo[]
      segment_tags: PIAudienceSegmentTags[]
      interes_tags: PIAudienceInteresTags[]
      description: string
    }
    profileImages: PIImages[]
    terms: {
      tags: PITermsTags[]
    }
}