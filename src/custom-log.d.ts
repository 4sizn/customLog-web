type StartEndOption = {
	hello?: Option;
	bye?: Option;
};

type RootOption = StartEndOption & {
	timestamp: boolean;
} & Option &
	Partial<Record<keyof Console, Option>>;
type Option = {
	prefix?: string;
	style?: string;
};
