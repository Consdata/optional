import {Optional} from './optional';

/**
 * - empty()
 * - ifPresent()
 * - ifPresentOrElse()
 * - filter()
 * - or()
 * - orElseThrow()
 * - equals (?)
 */

interface TestValue {
    name: string;
}

describe('Optional', () => {

    it('should define Optional class', () => {
        expect(Optional).not.toBeUndefined();
    });

});

describe('Optional.empty', () => {

    it('should return empty Optional', () => {
        expect(Optional.empty().isPresent()).toBeFalsy();
    });

    it('should return same reference multiple times', () => {
        expect(Optional.empty()).toBe(Optional.empty());
    });

});

describe('Optional.toString', () => {

    it('should build toString using null', () => {
        expect(Optional.of(null).toString()).toBe('Optional[empty]');
    });

    it('should build toString using value', () => {
        expect(Optional.of('a').toString()).toBe('Optional[value=a]');
    });

});

describe('Optional.of', () => {

    it('should expose "of" method', () => {
        expect((Optional as any).of).not.toBeUndefined();
    });

    it('should return Optional from "of" method', () => {
        expect(Optional.of() instanceof Optional).toBeTruthy();
    });

    it('should return valid Optional for null value', () => {
        expect(Optional.of(null)).toBeInstanceOf(Optional);
    });

    it('should return valid Optional for undefined value', () => {
        expect(Optional.of(undefined)).toBeInstanceOf(Optional);
    });

    it('should return valid Optional for non null value', () => {
        expect(Optional.of('value')).toBeInstanceOf(Optional);
    });

    it('should use generic for value type in "of" method', () => {
        const value: string = 'value';
        // will fail during TypeScript compilation if class not offer type support
        expect(Optional.of<string>(value)).not.toBeUndefined();
    });

    it('should use same instance for empty', () => {
        expect(Optional.of(null)).toBe(Optional.of(null));
    });

});

describe('Optional for null value', () => {

    const optional = Optional.of<TestValue>(null);

    it('should return false for isPresent', () => {
        expect(optional.isPresent()).toBeFalsy();
    });

    it('should return null for get', () => {
        expect(optional.get()).toBeNull();
    });

});

describe('Optional for non-null value', () => {

    const value: TestValue = {
        name: 'Gandalf',
    };
    const optional = Optional.of(value);

    it('should return true for isPresent', () => {
        expect(optional.isPresent()).toBeTruthy();
    });

    it('should return value for get', () => {
        expect(optional.get()).toBe(value);
    });

    it('should return mapped value for flatMap', () => {
        expect(optional.flatMap(v => v.name)).toBe(value.name);
    });

    it('should return optional of mapped value for map', () => {
        expect(optional.map(v => v.name) instanceof Optional).toBeTruthy();
    });

    it('should return optional with mapped value for map', () => {
        expect(optional.map(v => v.name).get()).toBe(value.name);
    });

});

describe('Optional.orElse', () => {

    it('should return value if present', () => {
        const value = 'expected-value';
        expect(Optional.of(value).orElse('else-value')).toBe(value);
    });

    it('should return other value if not present', () => {
        const otherValue = 'else-value';
        expect(Optional.of(null).orElse(otherValue)).toBe(otherValue);
    });

});

describe('Optional.orElseGet', () => {

    it('should return value if present', () => {
        const value = 'expected-value';
        expect(Optional.of(value).orElseGet(() => 'else-value')).toBe(value);
    });

    it('should return other value if not present', () => {
        const otherValue = 'else-value';
        expect(Optional.of(null).orElseGet(() => otherValue)).toBe(otherValue);
    });

    it('should not call supplier when value provided', () => {
        let supplierCalls = 0;

        Optional.of(10).orElseGet(() => ++supplierCalls);

        expect(supplierCalls).toBe(0);
    })

});

describe('Optional.ifPresent', () => {

    it('should call callback with value if present', () => {
        const expectedValue = 'expectedValue';
        let callbackValue;

        Optional.of(expectedValue).ifPresent(v => callbackValue = v);

        expect(callbackValue).toBe(expectedValue);
    });

    it('should not call callback if value not present', () => {
        Optional.of(null).ifPresent(v => {
            throw new Error('should not call callback!')
        });
    });

});
