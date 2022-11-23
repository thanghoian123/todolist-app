import {
  DefaultCrudRepository,
  BelongsToAccessor,
  juggler,
  repository} from '@loopback/repository';
import {Armor, Character} from '../models';
import {MysqlDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {CharacterRepository} from './character.repository';

export class ArmorRepository extends DefaultCrudRepository<
  Armor,
  typeof Armor.prototype.id
> {
  public readonly character: BelongsToAccessor<
    Character,
    typeof Armor.prototype.id
  >;

  constructor(
    @inject('datasources.postgresql') dataSource: MysqlDataSource,
    @repository.getter('CharacterRepository')
    protected characterRepositoryGetter: Getter<CharacterRepository>,
  ) {
    super(Armor, dataSource);

    this.character = this.createBelongsToAccessorFor('character',characterRepositoryGetter);
  }
}
