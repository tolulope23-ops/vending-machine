export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export interface Product {
  id: bigint;
  name: string;
  price: number;
  categoryId: bigint;
  imageName: string;
  serialNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: bigint;
  c_name: string;
  c_description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MachineInventory {
  id: bigint;
  vendingMachineId: bigint;
  productId: bigint;
  quantity: number;
  slotCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendingMachine {
  id: bigint;
  name: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: bigint;
  vendingMachineId: bigint;
  productId: bigint;
  quantity: number;
  amount: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}
