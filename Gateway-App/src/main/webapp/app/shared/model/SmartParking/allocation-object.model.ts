export interface IAllocationObject {
  id?: number;
  occupied?: boolean;
  type?: string;
}

export class AllocationObject implements IAllocationObject {
  constructor(public id?: number, public occupied?: boolean, public type?: string) {
    this.occupied = this.occupied || false;
  }
}
