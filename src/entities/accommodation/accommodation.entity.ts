export class Accommodation {
  id: string;
  isActive: boolean;
  status: string; // ListingStatus enum: DRAFT, PUBLISHED, ARCHIVED
  listingType: string; // ListingType enum: RENT, SALE
  title: string;
  address: string;
  description: string;
  country: string;
  city?: string;
  region?: string;
  latitude: number;
  longitude: number;
  price: number;
  currency: string;
  priceUnit: string; // PriceUnit enum: PER_NIGHT, PER_MONTH, TOTAL
  discount: number;
  buildYear?: number;
  documents?: any;
  mapUrl?: string;
  userId: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  // relations
  images?: any[]; // AccommodationImage[]
  amenities?: any[]; // AccommodationAmenity[]
  likes?: any[];
  ratings?: any[];
  contacts?: any[];
  bookings?: any[];
}
