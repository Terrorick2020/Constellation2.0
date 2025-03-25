<template>
    <div class="flex flex-wrap gap-2">
        <el-check-tag
            v-for="tag in tagItems"
            :checked="values.includes(tag.label)"
            v-bind:key="tag.value"
            type="primary"
            @change="onCheckedParams(tag)"
        >
            {{ tag.label }}
        </el-check-tag>
    </div>
</template>

<script lang="ts" setup>
import type { TagItem } from '~/constants/settings';


const props = defineProps({
  values: {
    type: Array<String>,
    required: true
  },
  tags: {
    type: Array<TagItem>,
    required: true
  }
})
const values = ref(props.values);
const tagItems = reactive(props.tags);

const onCheckedParams = (tag: any) => {
    if (!values.value.includes(tag.label)) {
        values.value.push(tag.label)
    } else {
        // @ts-ignore
        values.value = values.value.filter((item) => item !== tag.label)
    }
}

</script>
