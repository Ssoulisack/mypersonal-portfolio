import { NextRequest } from "next/server";
import { prisma } from "@/app/api/adapters/database";
import {
  NewSuccessResponse,
  NewErrorResponses,
  ErrorBadRequest,
  ErrorNotFound,
} from "@/app/api/middleware/responseMiddleware";
import BucketListResponse from "@/app/api/domain/models/bucketList_model";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ============================================
// GET - Get single item by ID (Path Parameter)
// ============================================
// Usage: GET /api/v1/buckets/123
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Get the path parameter
    const { id } = await params;
    
    // Validate the ID (should be a number)
    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) {
      throw ErrorBadRequest("Invalid ID format. ID must be a number");
    }

    // Fetch item with Prisma ORM
    const item = await prisma.bucketList.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw ErrorNotFound("Bucket list item not found");
    }

    // Transform Prisma result to match BucketListResponse type (id as string)
    const transformedItem: BucketListResponse = {
      id: item.id.toString(),
      title: item.title,
      status: item.status ?? false,
    };

    return NewSuccessResponse(transformedItem);
  } catch (error) {
    console.error("❌ Error fetching bucket_list item:", error);
    return NewErrorResponses(error);
  }
}

// ============================================
// PUT - Update item by ID (Path Parameter + Body)
// ============================================
// Usage: PUT /api/v1/buckets/123
// Body: { "title": "Updated title", "status": true }
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Get path parameter from URL
    const { id } = await params;
    const itemId = parseInt(id, 10);
    
    if (isNaN(itemId)) {
      throw ErrorBadRequest("Invalid ID format. ID must be a number");
    }

    // Get data from request body
    const body = await request.json();
    const { title, status } = body;

    // Validate required fields
    if (!title || typeof title !== "string") {
      throw ErrorBadRequest("Title is required and must be a string");
    }

    if (typeof status !== "boolean") {
      throw ErrorBadRequest("Status is required and must be a boolean");
    }

    // Update item with Prisma ORM
    const updatedItem = await prisma.bucketList.update({
      where: {
        id: itemId,
      },
      data: {
        title: title,
        status: status,
      },
    });

    // Transform Prisma result to match BucketListResponse type (id as string)
    const transformedItem: BucketListResponse = {
      id: updatedItem.id.toString(),
      title: updatedItem.title,
      status: updatedItem.status ?? false,
    };

    return NewSuccessResponse(transformedItem);
  } catch (error) {
    console.error("❌ Error updating bucket_list item:", error);
    
    // Handle Prisma not found error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NewErrorResponses(ErrorNotFound("Bucket list item not found"));
    }
    
    return NewErrorResponses(error);
  }
}

// ============================================
// DELETE - Delete item by ID (Path Parameter only)
// ============================================
// Usage: DELETE /api/v1/buckets/123
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Get path parameter from URL
    const { id } = await params;
    const itemId = parseInt(id, 10);
    
    if (isNaN(itemId)) {
      throw ErrorBadRequest("Invalid ID format. ID must be a number");
    }

    // Delete item with Prisma ORM
    const deletedItem = await prisma.bucketList.delete({
      where: {
        id: itemId,
      },
    });

    // Transform Prisma result to match BucketListResponse type (id as string)
    const transformedItem: BucketListResponse = {
      id: deletedItem.id.toString(),
      title: deletedItem.title,
      status: deletedItem.status ?? false,
    };

    return NewSuccessResponse(transformedItem);
  } catch (error) {
    console.error("❌ Error deleting bucket_list item:", error);
    
    // Handle Prisma not found error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NewErrorResponses(ErrorNotFound("Bucket list item not found"));
    }
    
    return NewErrorResponses(error);
  }
}

