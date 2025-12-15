// Bucket List Entity Types
export interface BucketListItem {
  id: number;
  title: string;
  status: boolean;
}

export interface BucketListErrorResponse {
  success: false;
  error: string;
  code: string;
}

// Custom error classes
export class BucketListDatabaseError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "BucketListDatabaseError";
  }
}

