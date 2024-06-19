import { memo, useCallback, useEffect, useState } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';

interface IPhoto {
  id: string;
  url: string;
  title: string;
}

const VirtualizedList = memo(() => {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      if (!photos) {
        throw new Error('photos is not defined!');
      }
      return (
        <div key={key} style={style}>
          <p>{photos[index].title}</p>
        </div>
      );
    },
    [photos]
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => setPhotos(json));
  }, []);

  console.count('list');

  return photos ? (
    <List
      width={350}
      height={350}
      rowHeight={50}
      rowCount={photos.length}
      rowRenderer={rowRenderer}
    />
  ) : (
    <div> Загрузка</div>
  );
});

export default VirtualizedList;
