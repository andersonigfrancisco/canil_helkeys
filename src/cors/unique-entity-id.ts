import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private values: string

  toString() {
    return this.values
  }

  toValues() {
    return this.values
  }

  constructor(values?: string) {
    this.values = values ?? randomUUID()
  }
}
