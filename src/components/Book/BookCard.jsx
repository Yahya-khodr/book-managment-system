import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StorageService from '../../Services/StorageService'

const BookCard = ({ book }) => {
  const [imageLink, setImageLink] = useState()

  useEffect(async () => {
    const url = await StorageService.getImageURL(book.cover)
    setImageLink(url)
  }, [book])

  return (
    <div>
      <Link to={`/book/edit/${book.id}`}>
        <img src={imageLink} alt={book.name} />
      </Link>
    </div>
  )
}

export default BookCard
