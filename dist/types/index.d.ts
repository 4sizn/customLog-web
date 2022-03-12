declare type StartEndOption = {
    hello?: Option;
    bye?: Option;
};
export declare type Option = {
    prefix?: string;
    style?: string;
};
export declare type RootOption = StartEndOption & {
    timestamp: boolean;
} & Option & Partial<Record<keyof Console, Option>>;
export {};
