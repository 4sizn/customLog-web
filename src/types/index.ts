type StartEndOption = {
	hello?: Option;
	bye?: Option;
};

export type Option = {
	prefix?: string;
	style?: string;
};

export type RootOption = StartEndOption & {
	timestamp?: boolean;
} & Option &
	Partial<Record<keyof Console, Option>>;
