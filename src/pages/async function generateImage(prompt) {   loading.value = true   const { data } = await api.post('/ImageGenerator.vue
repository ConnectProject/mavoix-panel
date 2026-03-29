
async function generateImage(prompt) {
  loading.value = true
  const { data } = await api.post('/generate-image', { prompt })
  imageUrl.value = data.url
  loading.value = false
} 

<!-- Template -->
<q-input v-model="prompt" label="Describe the image" />
<q-btn @click="generateImage(prompt)" label="Generate" />
<q-img v-if="imageUrl" :src="imageUrl" /> 
