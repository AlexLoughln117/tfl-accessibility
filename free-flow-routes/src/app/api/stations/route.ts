import { NextRequest, NextResponse } from 'next/server';
import { getAllStations } from '../../../lib/api/tfl';
import { sortStationsByAccessibility } from '../../../lib/api/accessibility';

/**
 * GET handler for /api/stations
 * Returns a list of all stations, with optional filtering and sorting
 */
export async function GET(request: NextRequest) {
  try {
    // Get search parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const sortByAccessibility = searchParams.get('sortByAccessibility') === 'true';
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    
    // Fetch stations from TfL API
    const stations = await getAllStations();
    
    // Filter by search query if provided
    let filteredStations = stations;
    if (query) {
      const normalizedQuery = query.toLowerCase();
      filteredStations = stations.filter(station => 
        station.name.toLowerCase().includes(normalizedQuery)
      );
    }
    
    // Sort by accessibility if requested
    if (sortByAccessibility) {
      filteredStations = sortStationsByAccessibility(filteredStations);
    }
    
    // Apply limit
    const limitedStations = filteredStations.slice(0, limit);
    
    // Return JSON response
    return NextResponse.json({
      success: true,
      count: limitedStations.length,
      data: limitedStations
    });
  } catch (error) {
    console.error('Error fetching stations:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch stations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 