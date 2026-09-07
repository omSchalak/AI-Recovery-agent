export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type OpportunityStatus = 
  | 'NEW' 
  | 'REVIEWING' 
  | 'ACTIONABLE' 
  | 'IN_PROGRESS' 
  | 'RECOVERED' 
  | 'DISMISSED';

export type OpportunityType = 
  | 'Payment Recovery' 
  | 'Churn Risk' 
  | 'Conversion Opportunity' 
  | 'Expansion Opportunity' 
  | 'Billing Issue' 
  | 'Inactive Customer';

export interface Opportunity {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  type: OpportunityType;
  estimatedValue: number;
  priority: PriorityLevel;
  confidenceScore: number; // 0 - 100
  status: OpportunityStatus;
  recommendedAction: string;
  createdAt: string;
  lastUpdated: string;
  signals: string[];
}

export type RiskTier = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CustomerActivityEvent {
  id: string;
  timestamp: string;
  type: string;
  title: string;
  description: string;
  amount?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  avatarUrl?: string;
  mrr: number;
  ltv: number;
  riskTier: RiskTier;
  recoverableValue: number;
  opportunityCount: number;
  status: 'Active' | 'At Risk' | 'Churned' | 'Recovered';
  joinedDate: string;
  timeline: CustomerActivityEvent[];
}

export type CampaignStatus = 'Draft' | 'Scheduled' | 'Running' | 'Paused' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  category: OpportunityType;
  status: CampaignStatus;
  targetAudienceCount: number;
  recoveredValue: number;
  channel: 'Email' | 'SMS' | 'Webhook' | 'In-App' | 'Multi-Channel';
  createdAt: string;
  conversionRate: number;
}

export type ConfidenceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface AiInsight {
  id: string;
  title: string;
  summary: string;
  impactValue: number;
  confidenceTier: ConfidenceTier;
  confidenceScore: number;
  category: OpportunityType;
  signals: string[];
  suggestedAction: string;
  status: 'Active' | 'Executing' | 'Completed' | 'Dismissed';
  createdAt: string;
}

export type IntegrationStatus = 'NOT_CONNECTED' | 'CONNECTING' | 'CONNECTED' | 'SYNCING' | 'SIMULATION';

export interface Integration {
  id: string;
  name: string;
  category: 'Payments' | 'Billing' | 'CRM' | 'Analytics' | 'Communication' | 'Ecommerce';
  status: IntegrationStatus;
  lastSyncedAt?: string;
  description: string;
  iconName: string;
  connectedAccount?: string;
}

export interface MetricSummary {
  recoverableRevenue: number;
  recoverableRevenueTrend: number;
  revenueRecovered: number;
  revenueRecoveredTrend: number;
  recoveryRate: number;
  recoveryRateTrend: number;
  activeOpportunities: number;
  activeOpportunitiesTrend: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Admin' | 'Analyst' | 'Operator' | 'Viewer';
}

export interface Workspace {
  id: string;
  name: string;
  plan: 'Starter' | 'Growth' | 'Enterprise';
  seatsUsed: number;
  totalSeats: number;
}
