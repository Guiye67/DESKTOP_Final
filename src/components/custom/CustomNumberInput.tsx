interface NumberInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
}

export const CustomNumberInput: React.FC<NumberInputProps> = ({
	value,
	onChange,
	placeholder,
}: NumberInputProps) => {
	return (
		<div className="tremor-TextInput-root relative w-full flex items-center min-w-[10rem] focus:outline-none focus:ring-2 bg-white hover:bg-gray-50 text-gray-500 border-gray-300 focus:ring-blue-200 rounded-md border shadow-sm">
			<input
				className="tremor-TextInput-input w-full focus:outline-none focus:ring-0 bg-transparent pl-4 pr-4 py-2 text-sm font-medium border-0 placeholder:text-gray-500"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type="number"
			/>
		</div>
	);
};
