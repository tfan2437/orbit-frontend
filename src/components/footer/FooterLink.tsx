import { Link } from "react-router-dom";

const FooterLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      to={href}
      className="text-sm text-white hover:text-neutral-400 transition-colors duration-200"
    >
      {text}
    </Link>
  );
};
export default FooterLink;
