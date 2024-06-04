import { Dispatch, FC, FormEventHandler } from 'react';
import { IAuth } from '../../entities/auth/IAuth';

interface IProps {
  login: Dispatch<IAuth>;
}

export const Auth: FC<IProps> = ({ login }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const room = formData.get('room');
    const user = formData.get('user');

    if (!room || !user) {
      throw new Error('Missing login information');
    }
    login({ user: String(user), room: String(room) });
    form.reset();
  };

  return (
    <div>
      <h3>Auth</h3>
      <form onSubmit={onSubmit}>
        <input required placeholder={'user'} name={'user'} />
        <input required placeholder={'room'} name={'room'} />
        <button type={'submit'}>login</button>
      </form>
    </div>
  );
};
