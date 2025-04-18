
function AutoCatch<T>(target: Object, key: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => T>): TypedPropertyDescriptor<(...args: any[]) => T> {
  const originalMethod = descriptor.value!;

  descriptor.value = function (...args: any[]): T {
    try {
      console.log(`Calling ${target.constructor.name} method ${key} with arguments: ${args}`);
      return originalMethod.apply(this, args);
    } catch (e) {
      console.error(`Error in ${target.constructor.name}.${key}:`, e);
      return getDefaultValue<T>();
    }
  };

  return descriptor;
}

function getDefaultValue<T>(): T {
  if (Array.isArray([] as unknown as T)) {
    return [] as unknown as T;
  }
  if (typeof ({} as T) === 'string') {
    return "" as unknown as T;
  }
  if (typeof ({} as T) === 'number') {
    return 0 as unknown as T;
  }
  if (typeof ({} as T) === 'boolean') {
    return false as unknown as T;
  }
  return {} as T; // default to empty object for other types
}