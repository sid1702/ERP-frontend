export interface User {
  id: number
  username: string
  createdAt?: Date
  lastLogin?: Date
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User
  token: string
}

export interface ProfileResponse {
  success: boolean
  message: string
  user: User
}

export interface ApiError {
  success: boolean
  message: string
} 