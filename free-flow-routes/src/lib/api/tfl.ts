const TFL_API_BASE_URL = 'https://api.tfl.gov.uk';
const APP_ID = process.env.NEXT_PUBLIC_TFL_APP_ID || '';
const APP_KEY = process.env.NEXT_PUBLIC_TFL_APP_KEY || '';

// Authentication parameters for TfL API
const authParams = `app_id=${APP_ID}&app_key=${APP_KEY}`;

export interface Station {
  id: string;
  name: string;
  lines: string[];
  accessibilityInfo?: StationAccessibility;
}

export interface StationAccessibility {
  stepFreeToStation: boolean;
  stepFreeToPlatform: boolean;
  stepFreeToTrain: boolean;
  hasStaffHelp: boolean;
  hasInductionLoop: boolean;
  details: string;
}

export interface JourneyPlan {
  journeyId: string;
  startLocation: string;
  endLocation: string;
  duration: number;
  legs: JourneyLeg[];
}

export interface JourneyLeg {
  departureTime: string;
  arrivalTime: string;
  duration: number;
  mode: string;
  lineId?: string;
  lineName?: string;
  fromPoint: string;
  toPoint: string;
  isStepFree: boolean;
}

// Fetch all tube stations
export async function getAllStations(): Promise<Station[]> {
  try {
    const response = await fetch(
      `${TFL_API_BASE_URL}/StopPoint/Mode/tube,dlr,overground,elizabeth-line?${authParams}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stations');
    }
    
    const data = await response.json();
    
    // Format the stations into a simpler structure
    return data.stopPoints.map((stop: any) => ({
      id: stop.id,
      name: stop.commonName.replace(' Underground Station', '').replace(' DLR Station', ''),
      lines: stop.lineModeGroups.flatMap((group: any) => group.lineIdentifier),
    }));
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
}

// Get station accessibility information
export async function getStationAccessibility(stationId: string): Promise<StationAccessibility | null> {
  try {
    const response = await fetch(
      `${TFL_API_BASE_URL}/StopPoint/${stationId}?${authParams}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch accessibility for station ${stationId}`);
    }
    
    const data = await response.json();
    
    // Extract accessibility information
    const accessibilityData = {
      stepFreeToStation: false,
      stepFreeToPlatform: false,
      stepFreeToTrain: false,
      hasStaffHelp: false,
      hasInductionLoop: false,
      details: 'No accessibility information available.'
    };
    
    // Process accessibility properties from the response
    if (data.additionalProperties) {
      const accessProps = data.additionalProperties.filter(
        (prop: any) => prop.category === 'Accessibility'
      );
      
      for (const prop of accessProps) {
        switch (prop.key) {
          case 'StepFreeAccess':
            accessibilityData.stepFreeToStation = prop.value.includes('Yes');
            break;
          case 'StepFreePlatformToTrain':
            accessibilityData.stepFreeToTrain = prop.value.includes('Yes');
            break;
          case 'StepFreeAccessNote':
            accessibilityData.details = prop.value;
            break;
          case 'HasInductionLoop':
            accessibilityData.hasInductionLoop = prop.value === 'Yes';
            break;
          case 'HasStaffHelp':
            accessibilityData.hasStaffHelp = prop.value === 'Yes';
            break;
        }
      }
      
      if (accessibilityData.stepFreeToStation) {
        accessibilityData.stepFreeToPlatform = true;
      }
    }
    
    return accessibilityData;
  } catch (error) {
    console.error(`Error fetching accessibility for station ${stationId}:`, error);
    return null;
  }
}

// Plan a journey between two stations
export async function planJourney(
  fromStationId: string,
  toStationId: string,
  journeyPreference: string = 'leastTime',
  accessibilityPreference: boolean = true
): Promise<JourneyPlan | null> {
  try {
    // Build query parameters
    let queryParams = [
      `from=${fromStationId}`,
      `to=${toStationId}`,
      'nationalSearch=false',
      `journeyPreference=${journeyPreference}`,
      'accessibilityPreference=noSolidStairs',
      authParams
    ].join('&');
    
    if (accessibilityPreference) {
      queryParams += '&mobility=stepFreeToVehicle';
    }
    
    const response = await fetch(
      `${TFL_API_BASE_URL}/Journey/JourneyResults?${queryParams}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to plan journey from ${fromStationId} to ${toStationId}`);
    }
    
    const data = await response.json();
    
    // Extract journey information from the first option
    const firstJourney = data.journeys?.[0];
    if (!firstJourney) {
      return null;
    }
    
    // Format the journey data
    const journeyPlan: JourneyPlan = {
      journeyId: `${fromStationId}-${toStationId}-${Date.now()}`,
      startLocation: data.fromLocationDisambiguation?.matchedStop?.[0]?.name || 'Start',
      endLocation: data.toLocationDisambiguation?.matchedStop?.[0]?.name || 'End',
      duration: firstJourney.duration,
      legs: firstJourney.legs.map((leg: any) => ({
        departureTime: leg.departureTime,
        arrivalTime: leg.arrivalTime,
        duration: leg.duration,
        mode: leg.mode.name,
        lineId: leg.routeOptions?.[0]?.lineId,
        lineName: leg.routeOptions?.[0]?.name,
        fromPoint: leg.departurePoint.commonName,
        toPoint: leg.arrivalPoint.commonName,
        isStepFree: leg.path?.stopPoints?.every((stop: any) => stop.accessibilityType === 'stepFreeToVehicle') || false,
      })),
    };
    
    return journeyPlan;
  } catch (error) {
    console.error(`Error planning journey from ${fromStationId} to ${toStationId}:`, error);
    return null;
  }
} 