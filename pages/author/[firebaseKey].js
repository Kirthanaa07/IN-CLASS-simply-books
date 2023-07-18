import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;
  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then((data) => {
      setAuthorDetails(data);
    });
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap flex-column text-white">
      <h5>
        {authorDetails?.first_name} {authorDetails?.last_name}
        {authorDetails?.favorite ? ' 🤍' : ''}
      </h5>
      <div>Author Email: <a href={`mailto:${authorDetails?.email}`}>{authorDetails?.email}</a></div>
      <hr />
      <div className="d-flex flex-row">
        {
          authorDetails.books ? authorDetails.books.map((book) => (
            <BookCard key={book.firebaseKey} showButtons={false} bookObj={book} onUpdate={() => { }} />
          )) : ''
        }
      </div>
    </div>
  );
}
