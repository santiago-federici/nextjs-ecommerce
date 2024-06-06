export function SizeSelector({
  key,
  handleClickOption,
  optionName,
  choiceDescription,
  selected,
  disabled,
}: {
  key: string;
  handleClickOption: any;
  optionName: string;
  choiceDescription: string;
  selected: boolean;
  disabled: boolean;
}) {
  return (
    <div
      key={key}
      onClick={() => handleClickOption(optionName, choiceDescription)}
      className={`w-7 h-7 text-xs font-semibold uppercase flex items-center justify-center rounded-md border transition duration-100 ${
        selected ? "border-gray-900 bg-gray-900 text-white" : ""
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      {choiceDescription}
    </div>
  );
}
