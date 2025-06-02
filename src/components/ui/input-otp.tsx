
import * as React from "react"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

// Base prop: don't extend all input props, but only necessary (custom)
interface InputOTPProps {
  value?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  containerClassName?: string;
  className?: string;
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, value = "", maxLength = 6, onChange, ...props }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(value ? value.split('') : Array(maxLength).fill(''));
    const [activeIndex, setActiveIndex] = React.useState(0); 

    React.useEffect(() => {
      if (typeof value === "string") {
        setOtp(value.split('').concat(Array(maxLength - value.length).fill('')));
      }
    }, [value, maxLength]);

    const handleSlotChange = (index: number, digit: string) => {
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(''));
      if (digit && index < maxLength - 1) setActiveIndex(index + 1);
    };

    return (
      <div
        className={cn(
          "flex items-center gap-2 has-[:disabled]:opacity-50",
          containerClassName
        )}
      >
        {Array.from({ length: maxLength }).map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            char={otp[index] || ''}
            isActive={activeIndex === index}
            onCharChange={(digit) => handleSlotChange(index, digit)}
            className={className}
            {...props}
          />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

interface InputOTPSlotProps {
  index: number;
  char?: string;
  isActive?: boolean;
  className?: string;
  onCharChange?: (value: string) => void;
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ index, char = '', isActive = false, className, onCharChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // Pass down user ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const hasFakeCaret = isActive && !char;

    React.useEffect(() => {
      if (isActive && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isActive]);

    return (
      <div
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "z-10 ring-2 ring-ring ring-offset-background",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {char}
        <input
          ref={inputRef}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          value={char || ''}
          onChange={e => onCharChange?.(e.target.value.slice(-1))}
          {...props}
        />
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
