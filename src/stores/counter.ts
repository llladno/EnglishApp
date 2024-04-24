import { defineStore } from "pinia";

export const useMovieStore = defineStore("movieStore", {
  state: () => ({
    error: {status: false,
      message: ''},
    activeTab: 1,
  }),
  actions: {
    setError(status: boolean, message: string) {
      this.error = {status, message};
      console.log(this.error)
      setTimeout(()=>{
        this.error = {status: false,
          message: ''};
      },3000)
    },
  }
});