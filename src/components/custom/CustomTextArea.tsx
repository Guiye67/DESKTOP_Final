interface TextAreaProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder: string;
}

export const CustomTextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	placeholder,
}: TextAreaProps) => {
	return (
		<textarea
			className="w-full h-40 py-2 px-4 hover:bg-gray-50 text-gray-700 border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};
