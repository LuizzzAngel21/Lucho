export interface NavItem {
  displayName: string; 
  route?: string;      
  requiredRole?: string; 
  children?: NavItem[];
}