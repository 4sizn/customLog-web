type StartEndOption = {
	hello?: Option;
	bye?: Option;
};

type RootOption = StartEndOption & {
	time: boolean;
} & Option &
	Partial<Record<keyof Console, Option>>;
type Option = {
	prefix?: string;
	style?: string;
};
