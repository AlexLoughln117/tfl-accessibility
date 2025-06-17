import { StationAccessibility } from './tfl';

/**
 * Determines if a station is fully accessible (step-free from street to train)
 */
export function isFullyAccessible(accessibility?: StationAccessibility | null): boolean {
  if (!accessibility) return false;
  return accessibility.stepFreeToStation && accessibility.stepFreeToTrain;
}

/**
 * Determines if a station is partially accessible (some accessibility features)
 */
export function isPartiallyAccessible(accessibility?: StationAccessibility | null): boolean {
  if (!accessibility) return false;
  return accessibility.stepFreeToStation && !accessibility.stepFreeToTrain;
}

/**
 * Gets an accessibility summary string
 */
export function getAccessibilitySummary(accessibility?: StationAccessibility | null): string {
  if (!accessibility) return 'No accessibility information available';
  
  if (isFullyAccessible(accessibility)) {
    return 'Full step-free access from street to train';
  } else if (isPartiallyAccessible(accessibility)) {
    return 'Step-free access from street to platform only';
  } else {
    return 'Limited step-free access';
  }
}

/**
 * Gets a color code for accessibility status
 * Returns tailwind color classes based on accessibility level
 */
export function getAccessibilityColorClasses(accessibility?: StationAccessibility | null): string {
  if (!accessibility) {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
  
  if (isFullyAccessible(accessibility)) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
  } else if (isPartiallyAccessible(accessibility)) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
  } else {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
  }
}

/**
 * Gets detailed accessibility features as a formatted list
 */
export function getAccessibilityFeaturesList(accessibility?: StationAccessibility | null): string[] {
  if (!accessibility) return ['No accessibility information available'];
  
  const features = [];
  
  if (accessibility.stepFreeToStation) {
    features.push('Step-free access from street to platform');
  }
  
  if (accessibility.stepFreeToTrain) {
    features.push('Step-free access from platform to train');
  }
  
  if (accessibility.hasStaffHelp) {
    features.push('Staff assistance available');
  }
  
  if (accessibility.hasInductionLoop) {
    features.push('Induction loops installed');
  }
  
  if (features.length === 0) {
    features.push('Limited accessibility features');
  }
  
  return features;
}

/**
 * Calculate overall accessibility score (0-100)
 * This can be used for sorting or filtering stations by accessibility
 */
export function calculateAccessibilityScore(accessibility?: StationAccessibility | null): number {
  if (!accessibility) return 0;
  
  let score = 0;
  
  // Main accessibility features carry more weight
  if (accessibility.stepFreeToStation) score += 40;
  if (accessibility.stepFreeToTrain) score += 30;
  
  // Additional features
  if (accessibility.hasStaffHelp) score += 20;
  if (accessibility.hasInductionLoop) score += 10;
  
  return score;
}

/**
 * Sorts a list of stations by accessibility score (most accessible first)
 */
export function sortStationsByAccessibility<T extends { accessibilityInfo?: StationAccessibility | null }>(
  stations: T[]
): T[] {
  return [...stations].sort((a, b) => {
    const scoreA = calculateAccessibilityScore(a.accessibilityInfo);
    const scoreB = calculateAccessibilityScore(b.accessibilityInfo);
    return scoreB - scoreA; // Descending order (most accessible first)
  });
}

/**
 * Filter stations by minimum accessibility requirements
 */
export function filterAccessibleStations<T extends { accessibilityInfo?: StationAccessibility | null }>(
  stations: T[],
  requirements: {
    requireFullAccess?: boolean;
    requireStaffHelp?: boolean;
    requireInductionLoop?: boolean;
  } = {}
): T[] {
  const { requireFullAccess, requireStaffHelp, requireInductionLoop } = requirements;
  
  return stations.filter(station => {
    const access = station.accessibilityInfo;
    if (!access) return false;
    
    if (requireFullAccess && !isFullyAccessible(access)) return false;
    if (requireStaffHelp && !access.hasStaffHelp) return false;
    if (requireInductionLoop && !access.hasInductionLoop) return false;
    
    return true;
  });
} 