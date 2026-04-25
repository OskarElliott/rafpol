import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'OskarElliott'
const REPO_NAME = 'rafpol'
const FILE_PATH = 'src/lib/siteData.json'
const BRANCH = 'main'

async function getFileSha(): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.sha ?? null
}

export async function POST(req: NextRequest) {
  // Auth check
  const cookieStore = cookies()
  const auth = cookieStore.get('admin_auth')
  if (!auth || auth.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const content = Buffer.from(JSON.stringify(body, null, 2)).toString('base64')
  const sha = await getFileSha()

  const payload: Record<string, unknown> = {
    message: 'admin: update site content',
    content,
    branch: BRANCH,
  }
  if (sha) payload.sha = sha

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
