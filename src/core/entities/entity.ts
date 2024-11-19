import { UniqueEntityId } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id(): UniqueEntityId {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId | string) {
    this.props = props

    if (id instanceof UniqueEntityId) {
      this._id = id
    } else {
      this._id = new UniqueEntityId(id)
    }
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
