import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'

import { HashComparer } from '@/domain/identity/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/identity/application/cryptography/hash-generator'
@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashComparer, HashGenerator],
})
export class CryptographyModule {}
