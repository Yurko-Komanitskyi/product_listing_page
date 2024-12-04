import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SingleValue } from 'react-select';
import Slider from 'rc-slider';
import classNames from 'classnames';
import { CustomSelector } from '../CustomSelector';

import { SortType } from '../../types/SortType';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setDefoult, setMinMax, setSortType } from '../../redux/filter';

import styles from './Filter.module.scss';
import 'rc-slider/assets/index.css';

const optionsSortBy = [
  { value: SortType.Alphabetically, label: 'Alphabetically' },
  { value: SortType.PriceLowToHigh, label: 'price: low to high' },
  { value: SortType.PriceHighTolow, label: 'price: high to low' },
];

const optionsCardCount = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

type RangeValue = [number, number];

export const Filter: React.FC = () => {
  const filter = useAppSelector(state => state.filter.data) as {
    sortType: SortType;
    minPrice: number;
    maxPrice: number;
  };

  const [range, setRange] = useState<RangeValue>([
    filter.minPrice,
    filter.maxPrice,
  ]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [sortTypeId, setSortTypeId] = useState(0);
  const [perPageId, setPerPageId] = useState(0);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');

  useEffect(() => {
    setFilterFlag(
      filter.maxPrice !== 40 ||
        filter.minPrice !== 10 ||
        filter.sortType !== SortType.Alphabetically ||
        perPage !== null,
    );
    setRange([filter.minPrice, filter.maxPrice]);
    setSortTypeId(
      optionsSortBy.findIndex(item => item.value === filter.sortType) || 0,
    );

    if (perPage) {
      setPerPageId(optionsCardCount.findIndex(item => item.value === perPage));
    }
  }, [filter, perPage]);

  const handleSortByChange = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    if (option) {
      dispatch(setSortType(option.value as SortType));
    }
  };

  const handleChange = (value: RangeValue) => {
    dispatch(setMinMax(value));
    setRange(value);
  };

  const handlePerPageChange = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    if (option) {
      if (option.value === 'all') {
        searchParams.delete('perPage');
      } else {
        searchParams.set('perPage', option.value);
      }

      setSearchParams(searchParams);
    }
  };

  const handleClear = () => {
    if (filterFlag) {
      dispatch(setDefoult());
      searchParams.delete('perPage');
      setSearchParams(searchParams);
      setFilterFlag(false);
      setPerPageId(0);
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__selectors}>
        <CustomSelector
          options={optionsSortBy}
          selectedId={sortTypeId}
          onChange={handleSortByChange}
          title="Sort by"
        />
        <CustomSelector
          options={optionsCardCount}
          selectedId={perPageId}
          onChange={handlePerPageChange}
          title="Items on page"
        />
      </div>

      <div className={styles.range}>
        <span className={styles.range__title}>Price range:</span>
        <Slider
          range
          min={10}
          max={40}
          step={1}
          value={range}
          onChange={value => handleChange(value as RangeValue)}
          className={styles.customSlider}
        />
        <div className={styles.values}>
          <span>${range[0]}</span>
          <span>${range[1]}</span>
        </div>
      </div>
      <span
        onClick={handleClear}
        className={classNames(styles.filter__clear, {
          [styles['filter__clear--active']]: filterFlag,
        })}
      >
        Clear filter
      </span>
    </div>
  );
};
