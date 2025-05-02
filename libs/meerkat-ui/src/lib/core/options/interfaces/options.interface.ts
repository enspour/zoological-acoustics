export interface MkOptions<V> {
  isSelected(value: V): boolean;
  select(value: V): void;
  deselect(value: V): void;
  toggle(value: V): void;
}
