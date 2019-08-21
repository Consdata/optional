/**
 * Null safe representation of any value.
 * Provides methods to check and manipulate stored value in null-safe way.
 * @param <T> - stored value type
 */
export class Optional<T> {

    /**
     * Returns empty optional.
     * Empty optional holds null value.
     * @param <T> - stored value type
     */
    public static empty<T>(): Optional<T> {
        return Optional.EMPTY;
    }

    /**
     * Creates instnace of Optional based on provided value.
     * @param value - value to store
     * @param <T> - value type
     */
    public static of<T>(value?: T): Optional<T> {
        if (value !== null && value !== undefined) {
            return new Optional<T>(value);
        } else {
            return Optional.empty<T>();
        }
    }

    /**
     * Instance of Optional for null|undefined.
     * All empty optionals should be same instance.
     */
    private static readonly EMPTY = new Optional(null);

    private constructor(private value: T) {
    }

    /**
     * Checks if stored value exists.
     * Returns falls for null and undefined value.
     * @return if optional contains non-null value
     */
    public isPresent(): boolean {
        return this.value !== undefined && this.value !== null;
    }

    /**
     * Gets stored value without additional checks.
     * Will return null if no value stored.
     * @return value if stored, null otherwise
     */
    public get(): T {
        return this.orElse(null);
    }

    /**
     * Maps stored value using passed mapping function.
     * Will return raw mapper result.
     * @param mapper function mapping value to result
     * @return raw value mapper result
     */
    public flatMap<M>(mapper: (value: T) => M): M {
        if (this.isPresent()) {
            return mapper(this.value);
        } else {
            // FIXME: return empty()
            return null;
        }
    }

    /**
     * Maps stored value using mapping function.
     * Will return optional with mapper result.
     * @param mapper function mapping value to result
     * @return optional of value mapper result
     */
    public map<M>(mapper: (value: T) => M): Optional<M> {
        return Optional.of(this.flatMap(mapper));
    }

    /**
     * Gets stored value or provided if optional is empty.
     * @param other default value if optional is empty
     * @return stored value if non-null, provided otherwise
     */
    public orElse(other: T): T {
        return this.orElseGet(() => other);
    }

    /**
     * Gets stored value or supplier result if optional is empty.
     * @param supplier default value supplier if optional is empty
     * @return stored value if non-null, supplier result otherwise
     */
    public orElseGet(supplier: () => T): T {
        if (this.isPresent()) {
            return this.value;
        } else {
            return supplier();
        }
    }

    /**
     * Gets object string representation.
     * @return string representation
     */
    public toString(): string {
        return this
            .map(value => `Optional[value=${value}]`)
            .orElse(`Optional[empty]`);
    }

    /**
     * Calls consumer with stored value if present.
     * Will not call consumer if value is empty.
     * @param consumer
     */
    public ifPresent(consumer: (value: T) => void): void {
        if (this.isPresent()) {
            consumer(this.value);
        }
    }

    /**
     * Calls consumer with stored value if present.
     * otherwise performs the given empty action.
     * @param consumer
     * @param emptyAction
     */
    public ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): void {
        if (this.isPresent()) {
            consumer(this.value);
        } else {
            emptyAction();
        }
    }

}
