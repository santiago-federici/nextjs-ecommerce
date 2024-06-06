export function ColorSelector({
  key,
  handleClickOption,
  optionName,
  choiceDescription,
  selected,
  disabled,
  choiceValue,
}: {
  key: string;
  handleClickOption: any;
  optionName: string;
  choiceDescription: string;
  selected: boolean;
  disabled: boolean;
  choiceValue: string;
}) {
  return (
    <div
      key={key}
      onClick={() => handleClickOption(optionName, choiceDescription)}
      className={`w-7 h-7 rounded-full p-[2px] ${
        selected ? "ring-1 ring-gray-900" : "ring-gray-300"
      }`}
    >
      <div
        className={`w-full h-full rounded-full ${
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
        }`}
        style={{ backgroundColor: choiceValue }}
      ></div>
    </div>
  );
}
