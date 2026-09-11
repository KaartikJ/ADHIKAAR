import { LandParcel, AuditLogItem, QueueItem } from '../types';

export const OFFICIAL_ASSETS = {
  emblem: '/assets/aistudio/emblem.png',
  seal: '/assets/aistudio/seal.png',
  khatauniDoc: '/assets/aistudio/khatauniDoc.png',
  ledgerFolio: '/assets/aistudio/ledgerFolio.png',
  heroBg: '/assets/aistudio/heroBg.png',
  mapBg: '/assets/aistudio/mapBg.png',
  // Fallback remote URLs
  remoteHeroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfDuiZgbaFhhiVJQ_1w1EBzLQqkfjhAt5JwJqRWSflYZ4nwNbFDbVxyrRQJH-36t7MfqFBK_xP12WkQX3YI6HT4RFzGTvd3kQCXfU5Z3k2GwggLVZ2omjY9r6QBqHKg2Ov2-7ZkXhX_-OJz22RVUcIof2-SNWeBGCB0XJVWjSMxp6YTxgS0GfS-jDvWDQIclpwpfg-TUnFMUF7Pe5HbdDJW0EtwI0S4o7Z9i71mTlASCtcrmqx6SEeZmjJ_FN5_iI7hsY',
  remoteSeal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYXya47cZRzssU6TnuGQCGQp1O2WncR54-1Xp2FIsYKLyMAZtP0CSug2h32_lDRwiaCi9sOWDVJzuiPugl5QOyqRzTeKFKxJj3p9pz5rclwu6luIix-O8mVjW8-A_r07JOABxcjGotoU7BJBooWg8JtcI-Is4dPYwkdvQgX3gv_POuRX8MhuLbr1lF3OH1sgJ62KpSepjdb0C70vlHI3yJ2H9cp4-YwPL1iw8BuozRwIfcQjY7E0mf5kqTYZt43OzrRHc',
};

export const NOTICES = [
  "New: Advisory on RoR Digital Signatures and Aadhaar-ULPIN Seeding under DILRMP 2.0 (Ref: DoLR/2026/LR-094)",
  "Gazette: State Land Records Modernization: Automated Kaithi & Modi script OCR validation live in Pilot Districts",
  "Circular: Standard Operating Procedure (SOP v3.2) for Patwari/Lekhpal active learning verification workflow",
  "Update: Mandatory 2FA integration live for all Revenue Inspector (Tehsildar) desks via Jan Parichay SSO",
  "Public Notice: Khatauni re-survey camp operational in Mawana Tehsil till 31st March 2026"
];

export const PARCELS: Record<string, LandParcel> = {
  '789': {
    khasra: '789',
    subDistrict: 'Mawana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    ulpin: 'UP-MRT-2026-981240',
    status: 'verified',
    statusBadge: 'Verified (99.9%)',
    syncBadge: 'DILRMP Synced',
    titleStatus: 'Joint Bhumidhar with Transferable Rights',
    owner: 'Rajesh Kumar Singh & Brother',
    ownerHindi: 'राजेश कुमार सिंह व सह-खातेदार',
    relation: 'S/o Ram Swaroop Singh',
    khata: '102',
    surveyRef: '422/A-East / Survey 2024-R4',
    mutation: 'MUT-2025-UP-0918 (Approved)',
    verifiedDate: '12 Jan 2026 (DSC Token Applied)',
    classification: 'Agricultural (Irrigated Single Crop)',
    recArea: '2.450 Ha (6.05 Acres)',
    gisArea: '2.448 Ha (6.048 Acres)',
    confVal: '99.9%',
    variance: '-0.002 Ha (-0.08%)',
    tolerance: '±0.005 Ha',
    perimeter: '648.20 Meters',
    vertices: '12 Georeferenced Nodes (WGS84)',
    adjoining: {
      North: 'Khasra No. 788 (Canal Feeder Branch #4)',
      South: 'Khasra No. 790 (State Highway Link Rd SH-117)',
      East: 'Khasra No. 787 (Gram Sabha Commons)',
      West: 'Khasra No. 422/A (Private Agricultural Plot)'
    }
  },
  '422/A': {
    khasra: '422/A',
    subDistrict: 'Mawana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    ulpin: 'UP-MRT-2026-441092',
    status: 'verified',
    statusBadge: 'Verified (99.4%)',
    syncBadge: 'DILRMP Synced',
    titleStatus: 'Sole Owner (Self-Acquired Residential)',
    owner: 'Kartik Jain',
    ownerHindi: 'कार्तिक जैन',
    relation: 'S/o Virendra Jain',
    khata: '088',
    surveyRef: '422/A-West',
    mutation: 'MUT-2024-UP-0104 (Approved)',
    verifiedDate: '18 Nov 2025 (e-Mudhra DSC)',
    classification: 'Homestead / Residential Abadi',
    recArea: '0.820 Ha (2.02 Acres)',
    gisArea: '0.820 Ha (2.025 Acres)',
    confVal: '99.4%',
    variance: '0.000 Ha (Exact Match)',
    tolerance: '±0.005 Ha',
    perimeter: '362.40 Meters',
    vertices: '8 Georeferenced Nodes (WGS84)',
    adjoining: {
      North: 'Gram Sabha Village Pathway',
      South: 'Khasra No. 423 (Residential Plot)',
      East: 'Khasra No. 789 (Rajesh Kumar Singh)',
      West: 'Mawana Town Approach Road'
    }
  },
  '512': {
    khasra: '512',
    subDistrict: 'Mawana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    ulpin: 'UP-MRT-2026-512089',
    status: 'disputed',
    statusBadge: 'Boundary Review Pending',
    syncBadge: 'Staging',
    titleStatus: 'Under Dispute (Section 38 / Boundary Review)',
    owner: 'Maheshwar Prasad & 2 Others',
    ownerHindi: 'महेश्वर प्रसाद व अन्य',
    relation: 'S/o Late Dinanath Prasad',
    khata: '119',
    surveyRef: '512-South Block',
    mutation: 'PENDING_ARBITRATION',
    verifiedDate: 'Pending Revenue Inspector Inspection',
    classification: 'Agricultural (Dry Land)',
    recArea: '3.120 Ha (7.70 Acres)',
    gisArea: '3.080 Ha (7.61 Acres)',
    confVal: '68.2%',
    variance: '-0.040 Ha (-1.28%)',
    tolerance: '±0.005 Ha',
    perimeter: '780.00 Meters',
    vertices: '16 Georeferenced Nodes (WGS84)',
    adjoining: {
      North: 'Khasra No. 511 (Agricultural)',
      South: 'Drainage Channel #2',
      East: 'Khasra No. 513 (Disputed Encroachment)',
      West: 'Village Ring Road'
    }
  }
};

export const AUDIT_LOGS: AuditLogItem[] = [
  {
    timestamp: '2026-03-09 11:24:08 IST',
    description: 'Aadhaar e-KYC authentication successful for UID ending in 4102 via Jan Parichay Gateway',
    ip: '103.24.188.42',
    device: 'Chrome 124 / Linux (NIC Secured)',
    status: 'SUCCESS',
    checksum: 'a8f9b2c3d4e5f607'
  },
  {
    timestamp: '2026-03-09 10:48:19 IST',
    description: 'Digital RoR (Nakal) certified extract downloaded for Khasra 789 (ULPIN: UP-MRT-2026-981240)',
    ip: '103.24.188.42',
    device: 'Chrome 124 / Linux (NIC Secured)',
    status: 'SUCCESS',
    checksum: 'c2e4f6a8b0d2e4f6'
  },
  {
    timestamp: '2026-03-08 16:15:33 IST',
    description: 'Cadastral WebGIS overlay query executed for Mawana Tehsil, Village Hastinapur (Bhu-Naksha v4)',
    ip: '103.24.188.42',
    device: 'Chrome 124 / Linux (NIC Secured)',
    status: 'SUCCESS',
    checksum: 'e7d9b1f3c5a7e9b1'
  },
  {
    timestamp: '2026-03-07 14:02:11 IST',
    description: 'Deed registration draft saved for Plot 14592039485721 with SHA-256 e-Vault ingest',
    ip: '103.24.188.42',
    device: 'Chrome 124 / Linux (NIC Secured)',
    status: 'SUCCESS',
    checksum: '9f8e7d6c5b4a3928'
  },
  {
    timestamp: '2026-03-06 09:30:54 IST',
    description: 'Failed OTP entry attempt detected during 2FA challenge. Blocked by Rate Limiter Rule 4',
    ip: '192.0.2.148',
    device: 'Mobile Safari / iOS 17.2',
    status: 'DENIED',
    checksum: '1122334455667788'
  },
  {
    timestamp: '2026-03-05 18:45:00 IST',
    description: 'Revenue Inspector sign-off timestamp verified against state repository token',
    ip: '10.244.12.89',
    device: 'NIC Intranet Gateway (Tehsildar Desk)',
    status: 'SUCCESS',
    checksum: '5a6b7c8d9e0f1a2b'
  },
  {
    timestamp: '2026-03-04 12:10:44 IST',
    description: 'Automated cross-database validation completed between Land Records (Bhuiyan) & Registration (NGDRS)',
    ip: '10.244.12.1',
    device: 'DILRMP Background Worker Node 03',
    status: 'SUCCESS',
    checksum: '4b3c2d1e0f9a8b7c'
  },
  {
    timestamp: '2026-03-02 15:20:19 IST',
    description: 'Mutation request #UP-2026-88192 submitted for automated cadastral verification',
    ip: '103.24.188.42',
    device: 'Chrome 124 / Linux (NIC Secured)',
    status: 'SUCCESS',
    checksum: '3a2b1c0d9e8f7a6b'
  }
];

export const QUEUE_ITEMS: QueueItem[] = [
  {
    docId: 'DOC-UP-2026-88192',
    thumbnail: OFFICIAL_ASSETS.khatauniDoc,
    ownerName: 'Rajesh Kumar Singh',
    recordType: 'Khatauni RoR Extract (Kaithi Script)',
    confidence: 82.4,
    confidenceBadge: 'Pending Review',
    submissionDate: '09 Mar 2026, 08:30 AM',
    district: 'Meerut (Mawana)',
    khasra: '789',
    status: 'PENDING'
  },
  {
    docId: 'DOC-UP-2026-88193',
    thumbnail: OFFICIAL_ASSETS.ledgerFolio,
    ownerName: 'Sunil Verma & Others',
    recordType: 'Registered Sale Deed (Modi Script)',
    confidence: 45.1,
    confidenceBadge: 'Action Required',
    submissionDate: '09 Mar 2026, 09:12 AM',
    district: 'Meerut (Sardhana)',
    khasra: '512',
    status: 'ACTION_REQUIRED'
  },
  {
    docId: 'DOC-UP-2026-88194',
    thumbnail: OFFICIAL_ASSETS.khatauniDoc,
    ownerName: 'Ram Avatar Sharma',
    recordType: 'Legacy Khasra Register (Devanagari)',
    confidence: 95.8,
    confidenceBadge: 'Verified',
    submissionDate: '08 Mar 2026, 17:40 PM',
    district: 'Meerut (Mawana)',
    khasra: '422/A',
    status: 'VERIFIED'
  },
  {
    docId: 'DOC-UP-2026-88195',
    thumbnail: OFFICIAL_ASSETS.ledgerFolio,
    ownerName: 'Harish Chandra Gupta',
    recordType: 'Partition Deed & Mutation Claim',
    confidence: 89.2,
    confidenceBadge: 'Pending Review',
    submissionDate: '08 Mar 2026, 14:15 PM',
    district: 'Meerut (Hastinapur)',
    khasra: '108',
    status: 'PENDING'
  },
  {
    docId: 'DOC-UP-2026-88196',
    thumbnail: OFFICIAL_ASSETS.khatauniDoc,
    ownerName: 'Bimla Devi w/o Late Jagdish',
    recordType: 'Warisan (Succession) Certificate',
    confidence: 97.1,
    confidenceBadge: 'Verified',
    submissionDate: '07 Mar 2026, 11:05 AM',
    district: 'Meerut (Mawana)',
    khasra: '204',
    status: 'VERIFIED'
  }
];
