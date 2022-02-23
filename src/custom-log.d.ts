type StartEndOption = {
	hello: Option;
	bye: Option;
};

type RootOption = StartEndOption & {
	time: boolean;
} & Option &
	Record<keyof Console, Option>;
type Option = {
	prefix?: string;
	style: string;
};
