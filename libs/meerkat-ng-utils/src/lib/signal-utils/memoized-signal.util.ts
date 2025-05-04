import { Signal, computed } from '@angular/core';

export class MkMemoizedSignal<TInput, TValue> {
  private lastInput: TInput | null = null;
  private lastValue: TValue | null = null;

  public readonly value: Signal<TValue>;

  constructor(input: Signal<TInput>, compute: (input: TInput) => TValue) {
    this.value = computed(() => {
      const current = input();

      if (this.lastInput !== current) {
        this.lastInput = current;
        this.lastValue = compute(current);
      }

      return this.lastValue!;
    });
  }

  public setMemo(input: TInput, value: TValue): void {
    this.lastInput = input;
    this.lastValue = value;
  }
}

export function createMemoizedSignal<TInput, TValue>(
  input: Signal<TInput>,
  compute: (input: TInput) => TValue,
): MkMemoizedSignal<TInput, TValue> {
  return new MkMemoizedSignal(input, compute);
}
