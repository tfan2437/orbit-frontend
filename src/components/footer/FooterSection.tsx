import FooterLink from "@/components/footer/FooterLink";
import type { LinksGroup } from "@/constants/link";

const FooterSection = ({ group }: { group: LinksGroup }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-neutral-500">{group.title}</p>
      {group.links.map((link) => (
        <FooterLink key={link.text} text={link.text} href={link.href} />
      ))}
    </div>
  );
};
export default FooterSection;
