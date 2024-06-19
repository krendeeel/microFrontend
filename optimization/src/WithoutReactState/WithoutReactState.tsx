import { FC, FormEventHandler, forwardRef, memo, useImperativeHandle, useRef } from 'react';

interface IStartedData {
  minutes: number;
  seconds: number;
}

interface IParams {
  startedData: IStartedData;
}

// неуправляемые компоненты позволяют сократить количество перерисовок между деревом компонентов
const WithoutReactState: FC<IParams> = memo(
  forwardRef(({ startedData }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        // управление состоянием компонента извне без useEffect`a
        focus: () => {
          if (!inputRef.current) {
            throw new Error('inputRef is not defined');
          }
          inputRef.current.focus();
        }
      }),
      []
    );

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const user = formData.get('user');

      if (!user) {
        throw new Error('Missing user information');
      }

      alert(`user is ${user}`);

      form.reset();
    };

    return (
      <form onSubmit={onSubmit}>
        <div>
          started at: {startedData.minutes} : {startedData.seconds}
        </div>
        <input required name={'user'} ref={inputRef} placeholder={'Пользователь..'} />
        <button type={'submit'}>alert</button>
      </form>
    );
  })
);

export default WithoutReactState;
