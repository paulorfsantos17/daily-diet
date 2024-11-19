import { Entity } from 'src/core/entities/entity'

interface UserProps {
  name: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: string) {
    const user = new User(props, id)
    return user
  }
}
