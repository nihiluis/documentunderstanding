import { filestoreClient } from "@/openapi/client"

interface FileStoreService {
  uploadImage(image: File): Promise<string>
}

export default function newFileStoreService(): FileStoreService {
  return {
    uploadImage,
  }
}

async function uploadImage(image: File): Promise<string> {
  const { data, error } = await filestoreClient.POST("/api/v1/file/upload", {
    body: { file: image },
    bodySerializer: body => {
      const formData = new FormData()
      if (body.file) {
        formData.set("file", body.file)
      }
      return formData
    },
  })

  if (error) {
    throw new Error("Failed to upload image")
  }

  if (!data.storedFilename) {
    throw new Error("Failed to read uploaded image id")
  }

  return data.storedFilename
}
