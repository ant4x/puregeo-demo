"use client";

import { type ReactNode } from "react";
import { askAboutShift, askAboutProgram, askCustomStay } from "./prefill";

export function ShiftCard({
  name,
  dates,
  className,
  children,
}: {
  name: string;
  dates: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact-form"
      className={className}
      onClick={() => askAboutShift(name, dates)}
    >
      {children}
    </a>
  );
}

export function ProgramCard({
  name,
  className,
  children,
}: {
  name: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact-form"
      className={className}
      onClick={() => askAboutProgram(name)}
    >
      {children}
    </a>
  );
}

export function CustomStayLink({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact-form"
      className={className}
      onClick={() => askCustomStay()}
    >
      {children}
    </a>
  );
}
