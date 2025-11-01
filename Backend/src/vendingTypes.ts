export interface Product {
  p_id: string;         
  name: string;    
  price: number;
  imageURL: string;   
  category?: string; 
  size?: string; 
}

export interface SlotStock {
  slotCode: string;        
  product: Product;        
  quantity: number;        
  capacity: number;        
  lastRestockedAt: string; 
  soldCount: number;       
  status?: "ACTIVE" | "EMPTY" | "FAULTY";
}

export interface VendingMachine {
  machineId: string;       
  slots: SlotStock[];   
}
