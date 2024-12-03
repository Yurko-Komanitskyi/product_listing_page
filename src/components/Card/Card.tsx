import { Link } from 'react-router-dom';

import styles from './Card.module.scss';
import { Figure } from '../../types/Figure';

interface Props {
  product: Figure;
}

export const Card: React.FC<Props> = ({ product }) => (
  <div className={styles.card}>
    <Link className={styles.card__imgLink} to={`/${product.id}`}>
      <img
        src={`/product_listing_page/${product.image}`}
        alt={product.name}
        className={styles.card__img}
      />
    </Link>
    <Link to={`/${product.id}`}>
      <span className={styles.card__title}>{product.name}</span>
    </Link>
    <div className={styles.card__prices}>
      <h3 className={styles.card__price}>{`$${product.price}`}</h3>
    </div>
    <hr />
  </div>
);
