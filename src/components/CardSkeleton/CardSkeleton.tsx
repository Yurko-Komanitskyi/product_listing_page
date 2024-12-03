import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardSkeleton.module.scss';

export const CardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={styles.cardSkeleton}>
        <Skeleton className={styles.cardSkeleton__img} />
        <Skeleton className={styles.cardSkeleton__title} />
        <Skeleton className={styles.cardSkeleton__price} />
      </div>
    </SkeletonTheme>
  );
};
