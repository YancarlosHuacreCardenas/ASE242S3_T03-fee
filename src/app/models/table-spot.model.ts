export interface TableSpot {
  tableId?: number;
  tableNumber: number;
  location: string;
  capacity: number;
  isAvailable?: boolean;
  notes?: string;
  status?: string;
  lastClean?: string;
  cleaningTime?: string;
  layoutDetails?: string;
}
