import { UpdatesPageContent } from './UpdatesPageContent'

export default async function UpdatesPage({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const pageParam = searchParams?.page ? Number(searchParams.page) : 1
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  return <UpdatesPageContent currentPage={currentPage} />
}
