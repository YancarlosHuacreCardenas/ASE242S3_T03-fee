export interface Reservation {
  reservationId?: number;
  reservationDate: string;      // LocalDate
  reservationTime: string;      // LocalTime
  guestsCount: number;          // Integer
  notes?: string;
  status: string;

  customer: {
    customerId: number;
  };

  tableSpot: {
    tableId: number;
  };
}
