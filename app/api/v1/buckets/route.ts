import { NextRequest } from "next/server";
import { prisma } from "@/app/api/adapters/database";
import {
  NewSuccessResponse,
  NewErrorResponses,
  ErrorBadRequest,
  ErrorNotFound,
} from "@/app/api/middleware/responseMiddleware";
import Pagination from "@/app/api/domain/models/pagination";
import BucketListResponse from "@/app/api/domain/models/bucketList_model";

// ============================================
// GET - List all items (with optional query params)
// ============================================
// Usage: GET /api/v1/buckets
//        GET /api/v1/buckets?status=true
//        GET /api/v1/buckets?status=true&page=1&limit=20
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const pageParam = searchParams.get("page"); // Treating offset as page number
    const limitParam = searchParams.get("limit");
    
    // Parse page number - handle null, empty string, and invalid values
    const page = pageParam && pageParam.trim() !== '' 
      ? parseInt(pageParam.trim(), 10) 
      : 1; // Default to page 1
    
    // Parse limit - handle null, empty string, and invalid values
    const limit = limitParam && limitParam.trim() !== '' 
      ? parseInt(limitParam.trim(), 10) 
      : 100;
    
    // Validate page and limit
    if (isNaN(page) || page < 1) {
      throw ErrorBadRequest("Page must be a valid positive number (starting from 1)");
    }
    if (isNaN(limit) || limit < 1) {
      throw ErrorBadRequest("Limit must be a valid positive number");
    }

    // Convert page number to record offset
    // Page 1 = skip 0, Page 2 = skip limit, Page 3 = skip 2*limit, etc.
    const offset = (page - 1) * limit;

    // Build Prisma where clause
    const where: { status?: boolean } = {};
    if (statusParam !== null && statusParam !== '') {
      where.status = statusParam === 'true';
    }

    // Get total count for pagination
    const totalCount = await prisma.bucketList.count({
      where: Object.keys(where).length > 0 ? where : undefined,
    });

    // Fetch items with Prisma ORM
    const items = await prisma.bucketList.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    if (items.length === 0) {
      throw ErrorNotFound("Failed to fetch bucket_list");
    }

    // Transform Prisma results to match BucketListResponse type (id as string)
    const transformedItems: BucketListResponse[] = items.map(item => ({
      id: item.id.toString(),
      title: item.title,
      status: item.status ?? false,
    }));

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page; // Use the parsed page number directly

    // Initialize pagination object
    const pagination: Pagination<BucketListResponse> = {
      limit: limit,
      totalPages: totalPages,
      page: currentPage,
      status: statusParam,
      result: transformedItems,
    };

    return NewSuccessResponse(pagination);
  } catch (error) {
    console.error("❌ Error fetching bucket_list:", error);
    return NewErrorResponses(error);
  }
}
// ============================================
// POST - Create new item (Request Body)
// ============================================
// Usage: POST /api/v1/buckets
// Body: { "title": "My task", "status": false }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, status } = body;

    // Validate required fields
    if (!title || typeof title !== "string") {
      throw ErrorBadRequest("Title is required and must be a string");
    }

    // Status is optional, default to false
    const itemStatus = status ?? false;

    // Create item with Prisma ORM
    const newItem = await prisma.bucketList.create({
      data: {
        title: title,
        status: itemStatus,
      },
    });

    // Transform Prisma result to match BucketListResponse type (id as string)
    const transformedItem: BucketListResponse = {
      id: newItem.id.toString(),
      title: newItem.title,
      status: newItem.status ?? false,
    };

    return NewSuccessResponse(transformedItem);
  } catch (error) {
    console.error("❌ Error creating bucket_list item:", error);
    return NewErrorResponses(error);
  }
}

// ============================================
// YES! You can have multiple HTTP methods in the same file:
// ============================================
//
// ✅ GET    - List all items (already implemented above)
// ✅ POST   - Create new item (already implemented above)
// ✅ PUT    - Update item (can add here, but better in [id] route)
// ✅ DELETE - Delete item (can add here, but better in [id] route)
// ✅ PATCH  - Partial update
// ✅ HEAD   - Get headers only
// ✅ OPTIONS - CORS preflight
//
// All exported functions are automatically routed by Next.js:
// - GET request → GET function
// - POST request → POST function
// etc.
//
// Note: For operations on specific items (by ID), it's better to use:
// app/api/v1/bucket-list/[id]/route.ts
// This file handles collection-level operations (list all, create new)
// ============================================
