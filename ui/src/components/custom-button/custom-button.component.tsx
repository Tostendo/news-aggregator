import React from "react";
import "./custom-button-styles.scss";

export const CustomButton: React.FC<React.ButtonHTMLAttributes<
  HTMLButtonElement
>> = ({ children, ...props }) => (
  <button className="custom-button" {...props}>
    {children}
  </button>
);
