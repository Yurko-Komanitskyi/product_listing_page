import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

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
  const [query, setQuery] = useState('');

  const filter = useAppSelector(state => state.filter.data) as {
    sortType: SortType;
    minPrice: number;
    maxPrice: number | null;
  };

  useEffect(() => {
    setLoader(true);
    fetch(`/api/figures.json`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  const handleQuery = useCallback(
    debounce((str: string) => {
      setQuery(str);
    }, 700),
    [],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    handleQuery(value);
  };

  const filterFigures = useMemo(() => {
    let filteredProducts = [...products];

    switch (filter.sortType) {
      case SortType.Alphabetically:
        filteredProducts = filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
      case SortType.PriceHighTolow:
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case SortType.PriceLowToHigh:
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
    }

    filteredProducts = filteredProducts.filter(
      item => filter.maxPrice == null || item.price <= filter.maxPrice,
    );

    filteredProducts = filteredProducts.filter(
      item => item.price >= filter.minPrice,
    );

    filteredProducts = filteredProducts.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );

    return filteredProducts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, loader, query]);

  return (
    <div className={styles.catalogPage}>
      {error ? (
        <WentWrong />
      ) : (
        <>
          <div className={styles.catalogPage__topgroup}>
            <h1 className={styles.catalogPage__title}>Funko Pops</h1>
            <div className={styles.catalogPage__searchGroup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                {/* eslint-disable-next-line max-len */}
                <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
              </svg>
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
                onChange={handleSearch}
              />
            </div>
          </div>
          <span
            className={styles.catalogPage__modelCount}
          >{`${filterFigures.length} models`}</span>
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
