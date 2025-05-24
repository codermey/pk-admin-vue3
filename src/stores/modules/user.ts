import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const permission = ref(['admin'])

  return { permission }
})
