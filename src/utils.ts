import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileToDataString(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onerror = (error) => reject(error)
    reader.onload = () => resolve(reader.result as string)
  })
}

export function disableAutoFocusOnOpenDialog(event: Event) {
  if (window.innerWidth < 768) {
    event.preventDefault()
  }
}
