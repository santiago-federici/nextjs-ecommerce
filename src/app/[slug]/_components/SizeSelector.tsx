export function SizeSelector({
  handleClickOption,
  optionName,
  choiceDescription,
  selected,
  disabled,
}: {
  handleClickOption: any;
  optionName: string;
  choiceDescription: string;
  selected: boolean;
  disabled: boolean;
}) {
  return (
    <div
      onClick={() => {
        !disabled && handleClickOption(optionName, choiceDescription);
      }}
      className={`w-7 h-7 text-xs font-semibold uppercase flex items-center justify-center rounded-md border transition duration-100 ${
        selected ? "border-gray-900 bg-gray-900 text-white" : ""
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      {choiceDescription}
    </div>
  );
}
