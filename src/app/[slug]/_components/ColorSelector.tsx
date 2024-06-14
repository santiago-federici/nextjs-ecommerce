export function ColorSelector({
  handleClickOption,
  optionName,
  choiceDescription,
  selected,
  disabled,
  choiceValue,
}: {
  handleClickOption: any;
  optionName: string;
  choiceDescription: string;
  selected: boolean;
  disabled: boolean;
  choiceValue: string;
}) {
  return (
    <div
      onClick={() => {
        !disabled && handleClickOption(optionName, choiceDescription);
      }}
      className={`w-7 h-7 rounded-full p-[2px] border relative ${
        selected ? "ring-1 ring-gray-900" : "ring-gray-300"
      }`}
    >
      <div
        className={`w-full h-full rounded-full ${
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
        }`}
        style={{ backgroundColor: choiceValue }}
      ></div>

      <span
        className={`${
          disabled && "bg-red-700"
        } h-[2px] w-[90%] absolute left-0 bottom-1/2 z-10 -skew-y-[45deg]`}
      ></span>
    </div>
  );
}
