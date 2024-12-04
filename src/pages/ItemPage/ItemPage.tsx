import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

import styles from './ItemPage.module.scss';

import { WentWrong } from '../../components/WentWrong';
import { Figure } from '../../types/Figure';

export const ItemPage: React.FC = () => {
  const [figure, setfigure] = useState<Figure | null>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    fetch(`/api/figures.json`)
      .then(response => response.json())
      .then(data => {
        setfigure(data.find((a: Figure) => a.id === itemId));
      })
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, [itemId]);

  useEffect(() => {
    if (!loader && figure === undefined) {
      navigate('/404');
    }
  }, [loader, figure, navigate]);

  return (
    <div className={styles.itemPage}>
      {!error && (loader || figure) && (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className={styles.figurePage}>
            <div className={styles.figurePage__card}>
              <span
                className={styles.figurePage__backButton}
                onClick={() => navigate('/')}
              >
                {'<- back'}
              </span>
              <h1 className={styles.figurePage__name}>{figure?.name}</h1>
              <div className={styles.figurePage__info}>
                <img
                  className={styles.figurePage__image}
                  src={figure?.image}
                  alt={figure?.name}
                />
                <div>
                  <p className={styles.figurePage__description}>
                    {figure?.description}
                  </p>
                  <hr />
                  <p className={styles.figurePage__price}>
                    Price: ${figure?.price.toFixed(2)}
                  </p>
                  <p className={styles.figurePage__category}>
                    Category: {figure?.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )}
      {error && <WentWrong />}
    </div>
  );
};
