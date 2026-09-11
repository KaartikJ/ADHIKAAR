export type PortalRole = 'citizen' | 'officer';

export type CitizenView = 
  | 'home'
  | 'dashboard'
  | 'inspection'
  | 'registration'
  | 'tracking'
  | 'audit'
  | 'profile'
  | 'webgis'
  | 'about'
  | 'help';

export type OfficerView =
  | 'dashboard'
  | 'queue'
  | 'webgis'
  | 'analytics'
  | 'audit'
  | 'profile'
  | 'inspection';

export interface LandParcel {
  khasra: string;
  subDistrict: string;
  district: string;
  state: string;
  ulpin: string;
  status: 'verified' | 'pending' | 'disputed';
  statusBadge: string;
  syncBadge: string;
  titleStatus: string;
  owner: string;
  ownerHindi: string;
  relation: string;
  khata: string;
  surveyRef: string;
  mutation: string;
  verifiedDate: string;
  classification: string;
  recArea: string;
  gisArea: string;
  confVal: string;
  variance: string;
  tolerance: string;
  perimeter: string;
  vertices: string;
  adjoining: {
    North: string;
    South: string;
    East: string;
    West: string;
  };
}

export interface AuditLogItem {
  timestamp: string;
  description: string;
  ip: string;
  device: string;
  status: 'SUCCESS' | 'DENIED';
  checksum: string;
}

export interface QueueItem {
  docId: string;
  thumbnail: string;
  ownerName: string;
  recordType: string;
  confidence: number;
  confidenceBadge: string;
  submissionDate: string;
  district: string;
  khasra: string;
  status: 'PENDING' | 'ACTION_REQUIRED' | 'VERIFIED';
}
