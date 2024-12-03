import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.NotFoundPage}>
    <div className={styles.NotFoundPage__contain}>
      <h1>Page Not Found</h1>
      <Link to="/" className={styles.NotFoundPage__link}>
        <h3 className={styles.NotFoundPage__linkText}>Redirect to home</h3>
      </Link>
    </div>
  </div>
);
