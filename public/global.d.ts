declare global {
    interface Window {
      ethereum?: {
        isMetaMask?: boolean;  // MetaMask-specific, but useful to include
        request: (options: { method: string; params?: Array<any> }) => Promise<any>;
        on?: (event: string, handler: (...args: any[]) => void) => void;
        removeListener?: (event: string, handler: (...args: any[]) => void) => void;
      };
    }
  }
  