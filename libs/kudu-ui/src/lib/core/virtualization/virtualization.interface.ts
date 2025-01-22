export interface KuduVirtualizationConfig {
  layout: { width: number; height: number } | undefined;
  scroll: { left: number; top: number } | undefined;
}

export interface KuduVirtualization<T> {
  virtualize(items: T[], config: KuduVirtualizationConfig): T[];
}
