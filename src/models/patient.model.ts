import { Condition } from './condition';

export class Patient {
  constructor(
    public firstName: string,
    public lastName: string,
    public condition: Condition,
  ) { }
}
