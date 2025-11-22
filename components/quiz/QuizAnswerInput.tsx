"use client";

type QuizAnswerInputProps = {
  value: string;
  onChange: (nextValue: string) => void;
  disabled?: boolean;
};

export function QuizAnswerInput({
  value,
  onChange,
  disabled = false,
}: QuizAnswerInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ketik jawabanmu di sini"
        className="w-full border-0 border-b-2 border-[#D4D4D8] bg-transparent px-1 py-3 text-lg font-semibold text-[#1E293B] focus:border-[#1BA5A5] focus:outline-none focus:ring-0 disabled:opacity-60"
      />
    </div>
  );
}
