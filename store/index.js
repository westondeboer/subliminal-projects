export const state = () => ({
  logo_bg: "default",
})

export const mutations = {
  setLogoBg (state, img) {
    state.logo_bg = img
  },   
}