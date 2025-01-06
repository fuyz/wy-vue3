
export interface HttpResponse {
  code: string
  success: boolean
  fullMessage?: string
  message?: string | null
  data?: any
  type?: String
  headers?: any
}
export interface BaseResponseConfig<T> {
  code: string
  message?: string
  fullMessage?: string
  success: boolean
  type?: string
  data: T
}
