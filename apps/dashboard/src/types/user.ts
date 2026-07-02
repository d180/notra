export interface NextOwnerCandidate {
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface OwnedOrganizationSummary {
  heardAboutNotraOther: string | null;
  heardAboutNotraSource: string | null;
  id: string;
  logo: string | null;
  memberCount: number;
  name: string;
  nextOwnerCandidate: NextOwnerCandidate | null;
  slug: string;
}
