import { defineStore } from 'pinia'
import { useAuthStore } from '#imports'
import axios, { AxiosHeaders } from 'axios'

import { lenProfileName, lenProfileUrl } from '~/env/auth.env'

import type { ApiRegion, ApiCities, ProfileInfo } from '~/types/profile/store'
import type { ApiProfileEndpointRes, AudienceProfile } from '~/types/profile/apiResponse'
import type { PIImages } from '~/types/profile/media'

import { patternForProfName, patternForProfUrl } from '~/env/profile.env'
import { 
  BASE_URL,
  //@ts-ignore
  PROFILES_ENDPOINT,
  //@ts-ignore
  USER_CURRENT,
  //@ts-ignore
  MEDIA_ENDPOINT,
  getHeaders,
} from '~/env/requests.env'


export const isValidProfileName = ( profileName: string ): [ boolean, number | null ] => {

  if ( !patternForProfName.test( profileName ) ) {
    return [ false, 1 ]
  } else if ( 
    profileName.length < lenProfileName.min ||
    profileName.length > lenProfileName.max
  ) {
    return [ false, 2 ]
  }

  return [ true,  null ]
}

export const isValidProfileUrl = ( profileUrl: string ): [ boolean, number | null ] => {

  if ( !patternForProfUrl.test( profileUrl ) ) {
    return [ false, 1 ]
  } else if (
    profileUrl.length < lenProfileUrl.min ||
    profileUrl.length > lenProfileUrl.max
  ) {
    return [ false,  2 ]
  }

  return [ true,  null ]
}

export const useProfileStore = defineStore('ProfileStore', () => {
  const { $api } = useNuxtApp()

  const profileType: Ref<number | null> = ref( null )
  const legalForm: Ref<number | null> = ref( null )
  const companyType: Ref<number | null> = ref( null )

  const workFields: Ref<number[]> = ref( [] )

  const companyName = ref( '' )
  const companyUrl = ref( '' )
  const companyDesc = ref( '' )

  const profileId: Ref<number | null> = ref( null )

  const getUserData = async () => {
    const { accessToken } = useAuthStore()

    const headers: AxiosHeaders = getHeaders( `Bearer ${ accessToken }` )

    const response = await axios.get(
      `${BASE_URL}${USER_CURRENT}`,
      {
        headers,
      }
    )

    if ( response.status !== 200 ) {
      return false
    }

    const profile: any = response.data.data.profile

    if ( profile ) {
      profileId.value = profile.id
    }

    return response 
  }

  const createProfile = async () => {
    const { accessToken, userId } = useAuthStore()

    const headers: AxiosHeaders = getHeaders( `Bearer ${accessToken}` )

    const userData = await getUserData()

    if ( !userData ) {
      return false
    }

    const data = {
      name: companyName.value,
      slug: companyUrl.value,
      web_site: 'Внешний веб ресурс не задан',
      address: 'Адресс не задан',
      description: 'Описание компании не задано',
      user_id: userId,
      profile_type_id: profileType.value,
      profile_legal_form_id: legalForm.value,
      profile_work_field_ids: [ ...workFields.value, companyType.value ],
      city_ids: [],
      region_ids: [],
      legal_entity: 'Поле не задано',
      descriptor: 'Дескриптор не задан',
      profile_work_condition_ids: [],
      background_image: null,
      logo: null,
    }

    const response = await axios.post(
      `${BASE_URL}${PROFILES_ENDPOINT}`,
      data,
      {
        headers,
      }
    )

    return response
  }

  const getMedia = async (id: number | null = null) => {
    try {
      const { accessToken } = useAuthStore()

      const headers: AxiosHeaders = getHeaders( `Bearer ${ accessToken }` )

      const response = await axios.get(
        `${BASE_URL}${MEDIA_ENDPOINT}${id ? '/' + id : '' }`,
        {
          headers,
        }
      )

      return response.data.data as PIImages[]
    } catch {}
  }

  const getProfileInfoFromSlug = async ( slug: string ) => {
    const { accessToken } = useAuthStore()

    const headers: AxiosHeaders = getHeaders( `Bearer ${ accessToken }` )

    const response = await axios.get(
      `${BASE_URL}${PROFILES_ENDPOINT}/${slug}`,
      {
        headers,
      }
    )

    const profile: ApiProfileEndpointRes = response.data.data

    if ( profile ) {

      profileId.value = profile.id

      profileInfo.value.name = profile.name ||  ''
      profileInfo.value.organization = profile.descriptor || ''
      profileInfo.value.description = profile.description || ''
      profileInfo.value.tags = profile.profile_work_fields
      profileInfo.value.previewImage = profile.background_image || ''
      profileInfo.value.logo = profile.logo
      profileInfo.value.views = profile.views

      profileInfo.value.location = profile.address || ''
      profileInfo.value.site = profile.web_site || ''
      profileInfo.value.terms.tags = profile.profile_work_conditions

      if ( profile.audience_profile ) {

        const apiAudience: AudienceProfile = profile.audience_profile

        // TODO: на api эти поля - bool, тут - string
        // раскоментить, когда переделают вёрстку
        // profileInfo.value.audience.man = apiAudience.has_male
        // profileInfo.value.audience.woman = apiAudience.has_female

        //TODO: удалить 2 следующие строки, когда раскоментируют выше
        profileInfo.value.audience.man = ''
        profileInfo.value.audience.woman = ''

        profileInfo.value.audience.age = apiAudience.age 
        profileInfo.value.audience.segment_tags = apiAudience.segment

        const regions: ApiRegion[] = apiAudience?.regions
        const cities: ApiCities[] = apiAudience?.cities

        const frontRegion = regions.map( item => ({
          id: item.id,
          name: item.name + item.region_type.name,
          slug: item.slug,
        }))

        profileInfo.value.audience.geo_tags = [ ...frontRegion, ...cities ]
        profileInfo.value.audience.interes_tags = apiAudience?.audience_interests
        profileInfo.value.audience.description = apiAudience.description ? apiAudience.description : ''
      }
    }

    //TODO: узнать структуру ответа от api и протестировать
    const mediaRes: PIImages[] | undefined = await getMedia()
    profileInfo.value.profileImages = mediaRes ? mediaRes : []

    return response.status === 200
  }

  const profileInfo: Ref<ProfileInfo> = ref({
    name: '',
    organization: '',
    logo: '',
    views: 0,
    previewImage: '',
    description: '',
    tags: [],
    location: '',
    site: '',
    audience: {
      man: '',
      woman: '',
      age: [],
      geo_tags: [],
      segment_tags: [],
      interes_tags: [],
      description: '',
    },
    profileImages: [],
    terms: {
      tags: []
    }
  })

  const audience = computed(() => profileInfo.value.audience)
  const terms = computed(() => profileInfo.value.terms)

  const getProfileInfo = async (id: string) => {
    const { data } = await $api.web().getProfileInfo(id)
    profileInfo.value = data.data
  }

  return {
    profileType,
    legalForm,
    companyType,
    workFields,

    companyName,
    companyUrl,
    companyDesc,
    profileId,

    getUserData,
    createProfile,

    profileInfo,
    audience,
    terms,

    getMedia,
    getProfileInfoFromSlug,
    getProfileInfo,
  }
})
