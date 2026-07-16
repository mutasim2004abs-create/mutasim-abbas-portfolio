import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-full font-display font-semibold text-[0.95rem] transition-[transform,background-color,border-color,color,box-shadow] duration-[250ms] ease-out-soft focus-visible:outline-2 focus-visible:outline-accent-bright disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[var(--accent-glow)] hover:bg-accent-bright hover:-translate-y-0.5 hover:shadow-[0_0_56px_rgba(94,210,156,0.5)] active:bg-accent-dim active:translate-y-0 active:scale-[0.98] disabled:bg-card-2 disabled:text-text-muted disabled:shadow-none",
  ghost:
    "border border-[var(--border-strong)] text-text hover:border-accent hover:text-accent hover:bg-[rgba(94,210,156,0.06)] active:scale-[0.98] active:border-accent-dim disabled:border-[var(--border)] disabled:text-text-muted",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "" } = props;
  const cls = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, className: _c, children: _ch, ...rest } =
      props;
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} className={cls} {...externalProps} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } =
    props as NativeButtonProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
