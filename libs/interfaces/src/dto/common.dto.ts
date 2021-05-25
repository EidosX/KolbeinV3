export type ResDTO<T> = T extends object ? ObjectResDTO<T> : PrimitiveResDTO<T>;

export type ObjectResDTO<T extends object> = { status: string } & T;
export type PrimitiveResDTO<T> = { status: string; value: T };
export type ErrorResDTO = { status: string; message?: string };
