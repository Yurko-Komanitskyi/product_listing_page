import styles from './CustomSelector.module.scss';
import { SingleValue } from 'react-select';
import Select from 'react-select';
import './SelectorReact.scss';

interface Props {
  options: { value: string; label: string }[];
  selectedId: number;
  onChange: (option: SingleValue<{ value: string; label: string }>) => void;
  title: string;
}

export const CustomSelector: React.FC<Props> = ({
  options,
  selectedId = 0,
  onChange,
  title,
}) => (
  <div className={styles.customSelector}>
    <span className={styles.customSelector__title}>{title}</span>
    <Select
      options={options}
      value={options[selectedId]}
      isSearchable={false}
      classNamePrefix="react-select"
      onChange={onChange}
    />
  </div>
);
