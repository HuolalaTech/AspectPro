import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../AspectPro';

export function innerWrapMethod(target, action, wrapper) {
  if (!target || !action) {
    Logger.e(TAG, `wrapMethod()->hook failed invalid params`)
    return
  }
  let origin: Function | undefined;
  let isPrototype = false;

  try {
    // 1.check prototype is defined (special case:router ) & action is defined on target.prototype(obj method)
    if (target.prototype && typeof target.prototype[action] === 'function') {
      origin = target.prototype[action];
      isPrototype = true;
    }
    // 2.action is defined on target itself (static method)
    else if (typeof target[action] === 'function') {
      origin = target[action];
    }

    // 3.check whether origin is found
    if (origin) {
      const destination = isPrototype ? target.prototype : target;

      // 4.get property descriptor
      const descriptor = Object.getOwnPropertyDescriptor(destination, action);

      // 5.try redefine property
      if (descriptor && !descriptor.writable) {
        try {
          Object.defineProperty(target, action, {
            writable: true,
            configurable: true
          });
        } catch (e) {
          Logger.d(TAG, `wrapMethod()->redefine property failed  exp:${e}`)
        }
      }

      // 6.check is writable
      if (descriptor && descriptor.writable) {
        destination[action] = wrapper(origin);
      } else {
        throw new Error(`wrapMethod()-> hook failed. Property ${action} is read-only or not writable.`)
      }
    } else {
      throw new Error(`wrapMethod()-> hook failed. originMethod not found for action: ${action}`)
    }
  } catch (e) {
    throw new Error(`hook failed. exp: ${e}`)
  }
}