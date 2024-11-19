import type { Meal } from "../../enterprise/meal";

export abstract class MealRepository { 
  abstract create(meal: Meal): Promise<void>;
}