import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { changePage, uiSelector } from '../store/reducer';
import { useAppSelector } from '../types/hooks';
const Pagination = () => {
  const { totalCount, pageSize, currentPage } = useAppSelector(uiSelector);
  console.log(currentPage);

  const dispatch = useDispatch();
  const pagesCount = Math.ceil(totalCount / pageSize);

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div className="mt-4 mb-4">
      {pages.map((page) => (
        <span
          className={`${
            currentPage === page ? '!bg-green-500' : ''
          } bg-secondary inline-block text-white py-1 px-2 ml-1 cursor-pointer hover:opacity-80 `}
          onClick={() => dispatch(changePage({ page }))}
        >
          {page}
        </span>
      ))}
    </div>
  );
};
export default Pagination;
