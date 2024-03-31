import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { db, storage } from '@/../firebase'

export interface CreateAnimalProps {
  avatar: File
  name: string
  sex: 'Macho' | 'Fêmea'
  size: 'Grande' | 'Médio' | 'Pequeno'
  weight: number
  address: string
  protectorName: string
  contact: string
}

async function uploadFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (file) {
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.error(error)
          reject(error)
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        },
      )
    } else {
      reject(new Error('File not found!'))
    }
  })
}

export async function createNewAnimal(data: CreateAnimalProps) {
  const avatar = await uploadFile(data.avatar)

  const newProductRef = await addDoc(collection(db, 'animals'), {
    avatar,
    name: data.name,
    sex: data.sex,
    size: data.size,
    weight: data.weight,
    address: data.address,
    protectorName: data.protectorName,
    contact: data.contact,
    timeStamp: serverTimestamp(),
  })

  console.log(newProductRef)

  return newProductRef
}
