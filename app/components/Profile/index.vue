<template>
  <ProfileLoading v-if="isLoad" />
  <UIError v-else-if="isNotFound" />
  <div v-else class="w-full flex flex-col gap-[30px]" >
    <ProfileHeader />
    <ProfileMedia />
    <ProfileTerms />
    <ProfileAudience />
    <ProfileOnlineInventory />
    <ProfileUniversalAdvertising title="Коллоборации" />
    <ProfileUniversalAdvertising title="Оффлайн инвентарь" />
    <ProfileFooter />
    <ProfileSimilarСompanies />
  </div>
</template>

<script setup>
import { useProfileStore } from '~/stores/profile.ts'
const profileStore = useProfileStore()

const route = useRoute()
const profile = route.params.profile

const isLoad = ref( true )
const isNotFound = ref( false )


const mountedGetProfileInfo = async () => {
  if ( typeof profile === 'string' ) {
    try {
      const response = await profileStore.getProfileInfoFromSlug( profile )

      isLoad.value = false
      isNotFound.value = !response
    } catch {
      isLoad.value = false
      isNotFound.value = true
    }
  }
}

onMounted(() => {
  mountedGetProfileInfo()
})
</script>