// PROFILE_ENDPOINT
export interface Owner {
    id: number
    username: string | null
    email: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    first_name: string | null
    last_name: string | null
    phone: string | null
}

export interface ProfileType {
    id: number
    name: string
    slug: string
    is_active: boolean
}

export interface ProfileLegalForm {
    id: number
    name: string
    full_name: string | null
    description: string | null
    slug: string
}

export interface WorkField {
    id: number
    name: string
    slug: string
}

export interface RegionType {
    id: number
    name: string
}

export interface Region {
    id: number
    name: string
    slug: string
    region_code: string
    region_type: RegionType
}

export interface City {
    id: number
    name: string
    slug: string
}

export interface AgeGroup {
    id: number
    name: string
    slug: string
}

export interface Segment {
    id: number
    name: string
    slug: string
}

export interface AudienceInterest {
    id: number
    name: string
    slug: string
}

export interface AudienceType {
    id: number
    name: string
    slug: string
}

export interface AudienceProfile {
    id: number
    description: string | null
    has_male: boolean
    has_female: boolean
    age: AgeGroup[]
    segment: Segment[]
    audience_interests: AudienceInterest[]
    audience_type: AudienceType
    regions: Region[]
    cities: City[]
}

export interface ApiProfileEndpointRes {
    id: number | null
    name: string | null
    slug: string | null
    web_site: string | null
    address: string | null 
    background_image: string
    description: string | null
    owner: Owner | null
    profile_type: ProfileType | null
    profile_legal_form: ProfileLegalForm | null
    profile_work_fields: WorkField[]
    regions: Region[]
    cities: City[]
    legal_entity: string | null
    descriptor: string | null
    logo: string
    audience_profile: AudienceProfile | null
    profile_work_conditions: any[]
    views: number
}