import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'

import { HashComparer } from '@/domain/identity/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/identity/application/cryptography/hash-generator'
import { Encrypter } from '@/domain/identity/application/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashComparer, HashGenerator, Encrypter],
})
export class CryptographyModule {}
