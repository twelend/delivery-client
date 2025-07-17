import { Input, InputProps } from "antd";
import { ChangeEvent } from "react";

interface PhoneInputFieldProps extends Omit<InputProps, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInputField = ({
  value,
  onChange,
  ...props
}: PhoneInputFieldProps) => {
  const formatPhoneNumber = (value: string | undefined): string => {
    if (!value) return "";

    const cleaned = value.replace(/\D/g, "");

    let formattedValue = "+7";

    if (cleaned.length > 1) {
      formattedValue += ` (${cleaned.substring(1, 4)}`;
    }
    if (cleaned.length > 4) {
      formattedValue += `) ${cleaned.substring(4, 7)}`;
    }
    if (cleaned.length > 7) {
      formattedValue += ` ${cleaned.substring(7, 9)}`;
    }
    if (cleaned.length > 9) {
      formattedValue += ` ${cleaned.substring(9, 11)}`;
    }

    return formattedValue;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value || "");
    onChange(formattedValue);
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      placeholder="+7 (999) 999 99 99"
      className="input-phone"
    />
  );
};

export default PhoneInputField;
