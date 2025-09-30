import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { 
  MonkeyTypeAPIResponse, 
  MonkeyTypeAPIError,
} from '@/app/core/types/monkey-type.type'
import { API_ENDPOINTS } from '@/app/core/config/constants'

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 MonkeyType API route called')
    const url = API_ENDPOINTS.MONKEY_TYPE.GET_RESULT

    // Create axios instance for this request
    const monkeyTypeAxios = axios.create({
      baseURL: process.env.MONKEY_URL || 'https://api.monkeytype.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
        ...(process.env.APE_KEY && { 'Authorization': `ApeKey ${process.env.APE_KEY}` })
      }
    })

    const { data } = await monkeyTypeAxios.get<MonkeyTypeAPIResponse>(url)

    if (!data) {
      throw new MonkeyTypeAPIError('No response data from MonkeyType API')
    }

    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('❌ MonkeyType API error:', error)
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return NextResponse.json({
          success: false,
          error: 'MonkeyType API access forbidden. API key may be invalid or insufficient permissions.'
        }, { status: 403 })
      }

      if (error.response?.status === 429) {
        return NextResponse.json({
          success: false,
          error: 'MonkeyType API rate limit exceeded. Please try again later.'
        }, { status: 429 })
      }
      
      return NextResponse.json({
        success: false,
        error: `MonkeyType API error: ${error.response?.status} ${error.response?.statusText}`
      }, { status: error.response?.status || 500 })
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
