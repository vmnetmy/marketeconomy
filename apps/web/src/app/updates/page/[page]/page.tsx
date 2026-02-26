import { notFound } from 'next/navigation'

import { getPostsPage } from '../../../../lib/cms'
import { UpdatesPageContent } from '../../UpdatesPageContent'

export const dynamicParams = false

export async function generateStaticParams() {
  const firstPage = await getPostsPage({ page: 1, limit: 10 })
  const totalPages = firstPage.totalPages ?? 1
  if (totalPages <= 1) return []

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }))
}

export default async function UpdatesPageNumber({ params }: { params: { page: string } }) {
  const pageNumber = Number(params.page)
  if (!Number.isFinite(pageNumber) || pageNumber < 2) {
    return notFound()
  }

  return <UpdatesPageContent currentPage={pageNumber} />
}
