import api from './api'
import { LoginResponse, ProfileResponse, User } from '../types/auth.types'

interface LoginCredentials {
  username: string
  password: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials)
      
      if (!data.success) {
        throw new Error(data.message)
      }
      
      localStorage.setItem('token', data.token)
      return { user: data.user, token: data.token }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      throw new Error(message)
    }
  },

  async logout() {
    localStorage.removeItem('token')
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<ProfileResponse>('/auth/profile')
    
    if (!data.success) {
      throw new Error(data.message)
    }
    
    return data.user
  }
} 