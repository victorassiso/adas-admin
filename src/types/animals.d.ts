export interface ProtectorProps {
  name: string
  phone: string
  image: string | StaticImageData
}

export interface AnimalProps {
  name: string
  location: string
  sex: 'macho' | 'fêmea'
  size: 'pequeno' | 'médio' | 'grande'
  weight: number
  image: string | StaticImageData
  protector: ProtectorProps
}
