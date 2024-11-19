import { CreateMealUseCase } from "./create-meal";
import { InMemoryMealRepository } from "test/repositories/meal-in-memory-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let sut: CreateMealUseCase
let mealRepository: InMemoryMealRepository
describe('create a meal', () => {
  beforeEach(() =>  {
    mealRepository = new InMemoryMealRepository()
    sut = new CreateMealUseCase(mealRepository)
  })
  
  it('should create a meal',async  () => {
    
    sut.execute({
      date: new Date(),
      description: 'description',
      isDiet: true,
      name: 'name',
      userId: new UniqueEntityId('1').toString()
    })
    
    
    expect(mealRepository.items).toHaveLength(1)
  })
});