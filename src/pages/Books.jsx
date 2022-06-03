import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { BookService } from '../Services/DatabaseService'
import PageHeading from '../components/PageHeading'
import BookList from '../components/Book/List'
import Alert from '../components/Alert'

const Books = () => {
  const { data, isLoading, error, status } = useQuery(
    'books',
    BookService.getAll
  )

  const queryClient = useQueryClient()

  const deleteMutation = useMutation((id) => BookService.remove(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    },
  })

  const deleteAction = async (id) => {
    deleteMutation.mutateAsync(id)
  }

  return (
    <>
      <PageHeading title="Category List" />
      <div className="mt-12">
        {error && <Alert type="error" message={error.message} />}
        {isLoading && (
          <Alert
            type="info"
            message="Loading..."
            innerClass="animate animate-pulse"
          />
        )}
        {status === 'success' && (
          <BookList data={data} deleteAction={deleteAction} />
        )}
      </div>
    </>
  )
}

export default Books
