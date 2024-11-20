import { StaticEntity } from './StaticEntity';

export type CreateStaticEntityRequest = Omit<StaticEntity, 'id'>;
