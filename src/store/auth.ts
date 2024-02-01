import { create } from 'zustand'
import { api } from '../libs/api'
import db from '../libs/database'
import { User } from '../types/User'

type LoginData = {
  login: string
  pass: string
}

type LoginResponse = {
  token: string
  user: {
    login: string
    name: string
    clientId: number
  }
}

interface AuthStore {
  token: string | null
  user: User | null
  retrieveToken: () => void
  retrieveUser: () => void
  storeAuth: (token: string, user: User) => void
  handleLogin: (data: LoginData) => void
  handleOfflineLogin: (data: LoginData) => void
}

export const useAuth = create<AuthStore>((set, get) => {
  return {
    token: null,
    user: null,

    retrieveToken: () => {
      const token = db.retrieveActiveToken()
      set({ token })
    },

    retrieveUser: () => {
      const user = db.retrieveLastUser()
      set({ user })
    },

    storeAuth: (token, user) => {
      set({
        token,
        user,
      })
      db.storeToken(token)
      db.storeUser(user)
      api.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },

    handleLogin: async (data) => {
      await api
        .post('/public/login', data)
        .then((res) => res.data)
        .then((response: LoginResponse) => {
          get().storeAuth(response.token, {
            ...response.user,
            password: data.pass,
            token: response.token,
          })
        })
        .catch(() => {
          throw new Error('Credenciais inválidas')
        })
    },

    handleOfflineLogin: (data) => {
      const users = db.retriveUsers()
      if (!users) {
        throw new Error(
          'Falha ao buscar credenciais armazenadas, conecte-se a internet e faça login',
        )
      }

      for (const user of users) {
        if (user.login === data.login && user.password === data.pass) {
          get().storeAuth(user.token, user)
          return
        }
      }

      throw new Error('Credenciais inválidas')
    },
  }
})
