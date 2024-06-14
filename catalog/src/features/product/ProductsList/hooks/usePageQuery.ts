import { Dispatch, useState } from 'react';

//TODO брать из url
export const usePageQuery = () => {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const setSearchProxy: Dispatch<string> = (value) => {
    setPage(0);
    setSearch(value);
  };

  return {
    page,
    search,
    setPage,
    setSearch: setSearchProxy
  };
};
