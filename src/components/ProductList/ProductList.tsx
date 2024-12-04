import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import styles from './ProductList.module.scss';

import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';
import { Figure } from '../../types/Figure';

interface Props {
  products: Figure[];
  loader: boolean;
}

export const ProductList: React.FC<Props> = ({ products, loader }) => {
  const [searchParams] = useSearchParams();

  const [itemOffset, setItemOffset] = useState(10);

  const itemsPerPage = +(searchParams.get('perPage') || 0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = itemsPerPage
    ? products.slice(itemOffset, endOffset)
    : products;
  const pageCount = Math.ceil(products.length / (itemsPerPage || 0)) || 0;

  const handlePageClick = (event: { selected: number }) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const newOffset = (event.selected * (itemsPerPage || 0)) % products.length;

    setItemOffset(newOffset);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handlePageClick({ selected: 0 }), [products]);

  return (
    <div className={styles.productList}>
      <div className={styles.productList__grid}>
        {loader &&
          Array(16)
            .fill(0)
            .map((_, i) => <CardSkeleton key={i} />)}
        {!loader &&
          products.length !== 0 &&
          currentItems.map(product => {
            return <Card key={product.id} product={product} />;
          })}
        {!loader && products.length === 0 && <h2>Funko Pop not found.</h2>}
      </div>
      {!!itemsPerPage && products.length !== 0 && (
        <ReactPaginate
          breakLabel={'...'}
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel=""
          containerClassName={styles.pagination}
          pageClassName={styles.pagination__page}
          activeClassName={styles.pagination__active}
          previousClassName={styles.pagination__previous}
          nextClassName={styles.pagination__next}
        />
      )}
    </div>
  );
};
