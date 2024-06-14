import { InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch, FC, FormEventHandler } from 'react';

interface IProps {
  onSearch: Dispatch<string>;
}

export const Search: FC<IProps> = ({ onSearch }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const value = String(formData.get('search'));

    onSearch(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <InputBase name="search" sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </form>
  );
};
