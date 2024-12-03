import { useEffect, useMemo, useState } from 'react';

import { Figure } from '../../types/Figure';
import { SortType } from '../../types/SortType';

import styles from './CatalogPage.module.scss';

import { ProductList } from '../../components/ProductList';
import { WentWrong } from '../../components/WentWrong';
import { useAppSelector } from '../../utils/hooks';
import { Filter } from '../../components/Filter';

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Figure[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  const filter = useAppSelector(state => state.filter.data) as {
    sortType: SortType;
    minPrice: number;
    maxPrice: number | null;
  };

  useEffect(() => {
    setLoader(true);
    fetch(`/product_listing_page/api/figures.json`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  const filterFigures = useMemo(() => {
    let filteredProducts = [...products];

    switch (filter.sortType) {
      case SortType.Alphabetically:
        filteredProducts = filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
      case SortType.PriceHighTolow:
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case SortType.PriceLowToHigh:
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }

    filteredProducts = filteredProducts.filter(
      item => filter.maxPrice == null || item.price <= filter.maxPrice,
    );

    filteredProducts = filteredProducts.filter(
      item => item.price >= filter.minPrice,
    );

    filteredProducts = filteredProducts.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    return filteredProducts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, loader, search]);

  return (
    <div className={styles.catalogPage}>
      {error ? (
        <WentWrong />
      ) : (
        <>
          <div className={styles.catalogPage__topgroup}>
            <h1 className={styles.catalogPage__title}>Funko Pops</h1>
            <div>
              <label
                htmlFor="search"
                className={styles.catalogPage__searchLabel}
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                className={styles.catalogPage__search}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <span
            className={styles.catalogPage__modelCount}
          >{`${products.length} models`}</span>
          {products.length === 0 && !loader ? (
            <div>
              <h2>{`There are no Funko Pops yet`}</h2>
            </div>
          ) : (
            <>
              <Filter />
              <ProductList products={filterFigures} loader={loader} />
            </>
          )}
        </>
      )}
    </div>
  );
};
