"use client";

import { Button } from "antd";
import Link from "next/link";
import { type PropsWithChildren } from "react";

interface AuthWrapperProps {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="bg-white w-full md:w-1/2 lg:w-1/3 shadow-2xl rounded-lg py-6 px-8 border-2 border-[#9d9c63]">
      {/* Title */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1
          style={{
            fontWeight: "800",
            lineHeight: "1.2",
            marginBottom: "0px",
          }}
          className="text-center text-4xl text-black/85"
        >
          {heading}
        </h1>
        {description && (
          <p className="font-semibold text-sm text-gray-600 text-center">
            {description}
          </p>
        )}
      </div>

      {/* main */}
      <div className="w-full mb-6">{children}</div>

      {/* footer */}
      <div className="w-full pt-4 border-t border-gray-200">
        {backButtonLabel && backButtonHref && (
          <Button type="text" className="w-full font-semibold underline ">
            <Link className="text-[16px]" href={backButtonHref}>
              {backButtonLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
