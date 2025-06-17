import { 
  isFullyAccessible, 
  isPartiallyAccessible,
  getAccessibilitySummary,
  calculateAccessibilityScore
} from '../lib/api/accessibility';
import { StationAccessibility } from '../lib/api/tfl';

describe('Accessibility Utilities', () => {
  describe('isFullyAccessible', () => {
    it('returns true when a station has step-free access to station and train', () => {
      const accessibility: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: true,
        stepFreeToPlatform: true,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'Test details'
      };
      expect(isFullyAccessible(accessibility)).toBe(true);
    });

    it('returns false when a station lacks some accessibility feature', () => {
      const accessibility: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: false,
        stepFreeToPlatform: true,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'Test details'
      };
      expect(isFullyAccessible(accessibility)).toBe(false);
    });

    it('returns false when accessibility info is null or undefined', () => {
      expect(isFullyAccessible(null)).toBe(false);
      expect(isFullyAccessible(undefined)).toBe(false);
    });
  });

  describe('getAccessibilitySummary', () => {
    it('returns appropriate summary for fully accessible stations', () => {
      const accessibility: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: true,
        stepFreeToPlatform: true,
        hasStaffHelp: true,
        hasInductionLoop: true,
        details: 'Test details'
      };
      expect(getAccessibilitySummary(accessibility)).toContain('Full step-free access');
    });

    it('returns appropriate summary for partially accessible stations', () => {
      const accessibility: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: false,
        stepFreeToPlatform: true,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'Test details'
      };
      expect(getAccessibilitySummary(accessibility)).toContain('platform only');
    });

    it('returns appropriate summary for limited accessibility', () => {
      const accessibility: StationAccessibility = {
        stepFreeToStation: false,
        stepFreeToTrain: false,
        stepFreeToPlatform: false,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'Test details'
      };
      expect(getAccessibilitySummary(accessibility)).toContain('Limited');
    });
  });

  describe('calculateAccessibilityScore', () => {
    it('calculates a score based on accessibility features', () => {
      const fullAccess: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: true,
        stepFreeToPlatform: true,
        hasStaffHelp: true,
        hasInductionLoop: true,
        details: 'Full access'
      };
      const partialAccess: StationAccessibility = {
        stepFreeToStation: true,
        stepFreeToTrain: false,
        stepFreeToPlatform: true,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'Partial access'
      };
      const noAccess: StationAccessibility = {
        stepFreeToStation: false,
        stepFreeToTrain: false,
        stepFreeToPlatform: false,
        hasStaffHelp: false,
        hasInductionLoop: false,
        details: 'No access'
      };

      expect(calculateAccessibilityScore(fullAccess)).toBeGreaterThan(calculateAccessibilityScore(partialAccess));
      expect(calculateAccessibilityScore(partialAccess)).toBeGreaterThan(calculateAccessibilityScore(noAccess));
      expect(calculateAccessibilityScore(noAccess)).toBe(0);
    });
  });
}); 