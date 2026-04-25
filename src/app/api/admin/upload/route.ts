import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin_auth')
  if (!auth || auth.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Cloudinary env vars missing' }, { status: 500 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = 'rafpol'

  // Sign: alphabetical order of params
  const sigString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
  const signature = createHash('sha1').update(sigString).digest('hex')

  // Build multipart form for Cloudinary
  const uploadForm = new FormData()
  uploadForm.append('file', file)
  uploadForm.append('api_key', apiKey)
  uploadForm.append('timestamp', timestamp)
  uploadForm.append('signature', signature)
  uploadForm.append('folder', folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: uploadForm }
  )

  const result = await res.json()

  if (!res.ok) {
    console.error('Cloudinary error:', result)
    return NextResponse.json({ error: result }, { status: 500 })
  }

  return NextResponse.json({ url: result.secure_url })
}