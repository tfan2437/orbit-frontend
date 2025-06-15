interface OutlineButtonProps {
  text: string;
  onClick?: () => void;
}

const OutlineButton = ({ text, onClick = () => {} }: OutlineButtonProps) => {
  return (
    <button
      className="rounded-full border border-neutral-700 bg-transparent px-4 py-2 text-sm font-medium text-neutral-400 outline-none hover:bg-neutral-800 hover:border-neutral-600 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default OutlineButton;
