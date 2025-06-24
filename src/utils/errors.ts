export class InvalidRefreshTokenError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid or expired refresh token');
    this.name = 'InvalidRefreshTokenError';
  }
}

export class NetworkError extends Error {
  constructor(message?: string) {
    super(message ?? 'Connection Error');
    this.name = 'NetworkError';
  }
}
