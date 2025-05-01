export interface MkVirtualizationConfig {
  layout: { width: number; height: number } | undefined;
  scroll: { left: number; top: number } | undefined;
}

export interface MkVirtualization<T> {
  virtualize(items: T[], config: MkVirtualizationConfig): T[];
}
