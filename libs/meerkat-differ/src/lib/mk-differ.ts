const removeDuplicates = <T>(arr: T[]) => {
  const result: T[] = [];

  const map = new Map();

  for (const item of arr) {
    if (!map.has(item)) {
      result.push(item);
      map.set(item, true);
    }
  }

  return result;
};

const getKeys = (...objs: object[]) => {
  return removeDuplicates(objs.flatMap((obj) => Object.keys(obj)));
};

const isArray = (arr: unknown): arr is any[] => {
  return !!arr && typeof arr === 'object' && Array.isArray(arr);
};

const isObject = (obj: unknown): obj is object => {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
};

const mapBy = <K extends PropertyKey, T>(
  items: T[],
  keySelector: (item: T, index: number) => K,
): Partial<Record<K, T>> => {
  return items.reduce(
    (acc, item, index) => {
      acc[keySelector(item, index)] = item;
      return acc;
    },
    {} as Partial<Record<K, T>>,
  );
};

const prefix = (changes: MkChange[], prefix: PropertyKey) => {
  return changes.map((change) => ({
    ...change,
    path: [prefix, ...change.path],
  }));
};

const trackByIndexFn = <T>(item: T, index: number) => {
  return index;
};

const trackBy = <T>(arr: T[], trackByFn: (item: T, index: number) => any) => {
  return mapBy<PropertyKey, T>(
    arr,
    (item, index) => trackByFn(item, index) ?? index,
  );
};

const findIndex = <T>(
  arr: T[],
  trackByValue: any,
  trackByFn: (item: any, index: number) => any,
): number => {
  return arr.findIndex(
    (item, index) => trackByFn(item, index).toString() === trackByValue,
  );
};

const findByPath = <T>(
  object: T,
  path: PropertyKey[],
  trackByFn: (item: any, index: number) => any,
): any => {
  let clone: any = object;

  for (const property of path) {
    if (clone) {
      if (Array.isArray(clone)) {
        const index = findIndex(clone, property, trackByFn);
        if (index !== -1) {
          clone = clone[index];
        } else {
          return undefined;
        }
      } else if (property in clone) {
        clone = clone[property];
      } else {
        return undefined;
      }
    }
  }

  return clone;
};

export interface MkChangeEdit {
  kind: 'E'; // E - edit property or element in array
  path: PropertyKey[];
  lhv: any;
  rhv: any;
}

export interface MkChangeAppend {
  kind: 'N' | 'AN'; // N - new property, AN - new array element
  path: PropertyKey[];
  value: any;
}

export interface MkChangeRemove {
  kind: 'R' | 'AR'; // R - remove property, AR - remove array element
  path: PropertyKey[];
  value: any;
}

export type MkChange = MkChangeEdit | MkChangeAppend | MkChangeRemove;

export class MkDiffer {
  static diff<L, R>(
    lhs: L,
    rhs: R,
    trackByFn: (item: any, index: number) => any = trackByIndexFn,
  ): MkChange[] {
    if (isArray(lhs) && isArray(rhs)) {
      return this.diffByArray(lhs, rhs, trackByFn);
    }

    if (isObject(lhs) && isObject(rhs)) {
      return this.diffByObject(lhs, rhs, trackByFn);
    }

    return this.diffByValue(lhs, rhs);
  }

  static diffByValue<L, R>(lhs: L, rhs: R): MkChange[] {
    if (Object.is(lhs, rhs)) {
      return [];
    }

    return [{ kind: 'E', path: [], lhv: lhs, rhv: rhs }];
  }

  static diffByObject<L extends object, R extends object>(
    lhs: L,
    rhs: R,
    trackByFn: (item: any, index: number) => any = trackByIndexFn,
  ): MkChange[] {
    const keys = getKeys(lhs, rhs) as (keyof L & keyof R)[];

    const changes: MkChange[] = [];

    for (const key of keys) {
      if (Object.is(lhs[key], rhs[key])) {
        continue;
      }

      if (key in lhs && key in rhs) {
        const lhv = lhs[key];
        const rhv = rhs[key];

        changes.push(...prefix(this.diff(lhv, rhv, trackByFn), key));
      } else if (key in lhs) {
        changes.push({ kind: 'R', path: [key], value: lhs[key] });
      } else if (key in rhs) {
        changes.push({ kind: 'N', path: [key], value: rhs[key] });
      }
    }

    return changes;
  }

  static diffByArray<L extends any[], R extends any[]>(
    lhs: L,
    rhs: R,
    trackByFn: (item: any, index: number) => any = trackByIndexFn,
  ): MkChange[] {
    const changes: MkChange[] = [];

    const lhsTracked = trackBy(lhs, trackByFn);
    const rhsTracked = trackBy(rhs, trackByFn);

    const keys = getKeys(lhsTracked, rhsTracked);

    for (const key of keys) {
      const lhv = lhsTracked[key];
      const rhv = rhsTracked[key];

      if (lhv && rhv) {
        changes.push(...prefix(this.diff(lhv, rhv, trackByFn), key));
      } else if (lhv) {
        changes.push({ kind: 'AR', path: [key], value: lhv });
      } else if (rhv) {
        changes.push({ kind: 'AN', path: [key], value: rhv });
      }
    }

    return changes;
  }

  static applyChanges<T>(
    target: T,
    changes: MkChange[],
    trackByFn: (item: any, index: number) => any = trackByIndexFn,
  ) {
    for (const change of changes) {
      const property = change.path.at(-1);
      if (!property) {
        continue;
      }

      const path = change.path.slice(0, -1);
      const element = findByPath(target, path, trackByFn);
      if (element === undefined) {
        continue;
      }

      switch (change.kind) {
        case 'E': {
          element[property] = change.rhv;
          break;
        }
        case 'N': {
          element[property] = change.value;
          break;
        }
        case 'R': {
          element[property] = undefined;
          break;
        }
        case 'AN': {
          element.push(change.value);
          break;
        }
        case 'AR': {
          const index = findIndex(element, property, trackByFn);
          element.splice(index, 1);
          break;
        }
      }
    }

    return target;
  }

  static revertChanges<T>(
    target: T,
    changes: MkChange[],
    trackByFn: (item: any, index: number) => any = trackByIndexFn,
  ) {
    for (const change of changes) {
      const property = change.path.at(-1);
      if (!property) {
        continue;
      }

      const path = change.path.slice(0, -1);
      const element = findByPath(target, path, trackByFn);
      if (element === undefined) {
        continue;
      }

      switch (change.kind) {
        case 'E': {
          element[property] = change.lhv;
          break;
        }
        case 'N': {
          element[property] = undefined;
          break;
        }
        case 'R': {
          element[property] = change.value;
          break;
        }
        case 'AN': {
          const index = findIndex(element, property, trackByFn);
          element.splice(index, 1);
          break;
        }
        case 'AR': {
          element.push(change.value);
          break;
        }
      }
    }

    return target;
  }
}
