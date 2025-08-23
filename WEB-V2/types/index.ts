export interface ButtonProps {
  buttonLabel: string;
  buttonMargin?: string;
  buttonSize?: string;
  buttonDisplay: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  gender?: string;
  role: string;
  status: string;
  isVerified: boolean;
  isActive: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: string;
  resetToken?: string | null;
  resetTokenExpires?: string | null;
  loginAttempts?: {
    count: number;
    lastAttempt: string;
  };
  otpAttempts?: any;
  resetAttempts?: any;
  activeSessions?: Array<{
    id: string;
    expiresAt: string;
    ipAddress: string;
    userAgent: string;
    lastActivity: string;
  }>;
  loginHistory?: Array<{
    date: string;
    ipAddress: string;
    userAgent: string;
  }>;
  lastLoginAt?: string | null;
  totalActiveDays?: number;
  activityMilestones?: any;
  isApproved?: boolean;
  isEmailVerified?: boolean;
  isOtpVerified?: boolean;
  otpToken?: string | null;
  otpExpires?: string | null;
  lastLogin: string;
  securityAuditLog?: any[];
  refreshTokens?: any[];
  createdAt: string;
  updatedAt: string;
}

export const navLinks = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Encyclopedia", href: "/encyclopedia" },
  { label: "Donate", href: "/donate" },
];

export const profileLinks = [
  { label: "Personal Details", modal: "personalDetails" },
  { label: "Username", modal: "username" },
  { label: "Password", modal: "password" },
  // { label: "Preferred Language", modal: "language" },
  // { label: "History", modal: "history" },
  // { label: "Saved", modal: "saved" },
  { label: "Delete Account", modal: "delete" },
];
