import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      expand={false}
      className="toaster group"
      style={
        {
          "--normal-bg": "#000",
          "--normal-text": "#fff",
          "--normal-border": "#404040",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
