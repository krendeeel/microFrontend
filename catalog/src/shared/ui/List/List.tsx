import { ReactNode, JSX } from 'react';
import Box from '@mui/material/Box';
import ListBase from '@mui/material/List';

interface IEntityBase {
  id: string;
}

interface IProps<Entity extends IEntityBase> {
  entities: Entity[];
  template(entity: Entity): ReactNode;
}

export const List = <Entity extends IEntityBase>({
  entities,
  template
}: IProps<Entity>): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ListBase>{entities.map((entity) => template(entity))}</ListBase>
    </Box>
  );
};
