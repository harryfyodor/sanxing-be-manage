import { extendObservable, action } from 'mobx';

class UserStore {
  constructor () {
    extendObservable(this, {
      isLogin: true,
      login: action(() => {
        this.isLogin = true
      }),
      logout: action(() => {
        this.isLogin = false
      })
    })
  }
}

export default new UserStore()
