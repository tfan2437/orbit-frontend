import FooterSection from "@/components/footer/FooterSection";
import {
  FOOTER_RESEARCH,
  FOOTER_ADVANCEMENT,
  FOOTER_ORBITAI,
  FOOTER_API,
  FOOTER_BUSINESS,
  FOOTER_COMPANY,
  FOOTER_POLICY,
} from "@/constants/link";

const Footer = () => {
  return (
    <footer className="mx-auto mb-20 w-full max-w-[1440px] bg-black px-8 pt-12">
      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 font-light">
        <div className="col-span-1 flex flex-col gap-12">
          <FooterSection group={FOOTER_RESEARCH} />
          <FooterSection group={FOOTER_ADVANCEMENT} />
        </div>
        <div className="col-span-1 flex flex-col gap-12">
          <FooterSection group={FOOTER_ORBITAI} />
          <FooterSection group={FOOTER_API} />
        </div>
        <div className="col-span-1 flex flex-col gap-12">
          <FooterSection group={FOOTER_BUSINESS} />
          <FooterSection group={FOOTER_COMPANY} />
        </div>
        <div className="col-span-1 flex flex-col gap-12">
          <FooterSection group={FOOTER_POLICY} />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
