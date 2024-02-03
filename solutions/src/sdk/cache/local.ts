import NodeCache from "node-cache";

type TCacheKey = string | number;

class LocalCache {
    private static _instance: LocalCache;

    private cache: NodeCache;

    private constructor(ttlSeconds: number) {
        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
        });
    }

    public static getInstance(): LocalCache {
        if (!LocalCache._instance) {
            LocalCache._instance = new LocalCache(1000);
        }

        return LocalCache._instance;
    }

    public get<T>(key: TCacheKey): T | undefined {
        return this.cache.get(key);
    }

    public set<T>(key: TCacheKey, data: T): void {
        this.cache.set(key, data);
    }

    public unset(key: TCacheKey): void {
        this.cache.del(key);
    }

    public hasKey(key: TCacheKey): boolean {
        return this.cache.has(key);
    }
}

export { LocalCache, TCacheKey };
