import ContainerPost from '../ContainerPost/ContainerPost';
import s from './Filter.module.scss';

interface IFilterProps {
  filters: string[];
  onClear: () => void;
  deleteFilterByIndex: (filterID: number) => void;
}

const Filter = ({ filters, onClear, deleteFilterByIndex }: IFilterProps) => {
  if (filters.length === 0) {
    return <div className={s.empty}></div>;
  }

  return (
    <div className={s.filter}>
      <ContainerPost featured={false}>
        <div className={s.filterContainer}>
          <div className={s.filterContainerItems}>
            {filters.map((filter, index) => (
              <div className={s.filterBox} key={'id' + index}>
                <div className={s.name}>{filter}</div>
                <button
                  onClick={() => {
                    deleteFilterByIndex(index);
                  }}>
                  <img src="./images/icon-remove.svg" alt="Close" />
                </button>
              </div>
            ))}
          </div>
          <div className={s.clear} onClick={onClear}>
            Clear
          </div>
        </div>
      </ContainerPost>
    </div>
  );
};

export default Filter;
