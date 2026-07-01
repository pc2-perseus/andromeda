import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput, {
    type OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type RootProps = BaseNumberField.Root.Props;

export interface NumberFieldProps
    extends Omit<RootProps, "id" | "value" | "onValueChange" | "slotProps"> {
    id?: string;
    value: number;
    onChange?: (value: number) => void;
    onValueChange?: RootProps["onValueChange"];
    label?: React.ReactNode;
    size?: "small" | "medium";
    error?: boolean;
    helperText?: React.ReactNode;
    fullWidth?: boolean;
    slotProps?: {
        input?: Partial<OutlinedInputProps>;
    };
}

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
function SSRInitialFilled() {
    return null;
}
SSRInitialFilled.muiName = "Input";

/**
 * Taken an adapted from: https://mui.com/material-ui/react-number-field/
 * Since they don't provide a ready-to-use NumberField but recommend copying
 * their code.
 */
export default function NumberField({
    id: idProp,
    label,
    error,
    size = "medium",
    helperText,
    fullWidth,
    onChange,
    onValueChange,
    slotProps,
    value,
    ...other
}: NumberFieldProps): React.ReactElement {
    function clamp(input: number): number {
        const withMin =
            typeof other.min === "number" ? Math.max(input, other.min) : input;
        return typeof other.max === "number"
            ? Math.min(withMin, other.max)
            : withMin;
    }

    const normalizedValue = clamp(value);

    let id = React.useId();
    if (idProp !== undefined) {
        id = idProp;
    }

    const inputSlotProps = slotProps?.input;

    return (
        <BaseNumberField.Root
            {...other}
            id={id}
            value={normalizedValue}
            onValueChange={(nextValue, details) => {
                onValueChange?.(nextValue, details);
                if (onChange !== undefined && nextValue !== null) {
                    onChange(clamp(nextValue));
                }
            }}
            render={(props, state) => (
                <FormControl
                    size={size}
                    fullWidth={fullWidth}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                >
                    {props.children}
                </FormControl>
            )}
        >
            <SSRInitialFilled {...other} />
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <BaseNumberField.Input
                id={id}
                render={(props, state) => (
                    <OutlinedInput
                        {...inputSlotProps}
                        label={label}
                        inputRef={props.ref}
                        value={state.inputValue}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onKeyUp={props.onKeyUp}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        slotProps={{
                            input: props,
                        }}
                        endAdornment={
                            <>
                                {inputSlotProps?.endAdornment}
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        flexDirection: "column",
                                        maxHeight: "unset",
                                        alignSelf: "stretch",
                                        borderLeft: "1px solid",
                                        borderColor: "divider",
                                        ml: 0,
                                        "& button": {
                                            py: 0,
                                            flex: 1,
                                            borderRadius: 0.5,
                                        },
                                    }}
                                >
                                    <BaseNumberField.Increment
                                        render={
                                            <IconButton
                                                size={size}
                                                aria-label="Increase"
                                            />
                                        }
                                    >
                                        <KeyboardArrowUpIcon
                                            fontSize={size}
                                            sx={{
                                                transform: "translateY(2px)",
                                            }}
                                        />
                                    </BaseNumberField.Increment>

                                    <BaseNumberField.Decrement
                                        render={
                                            <IconButton
                                                size={size}
                                                aria-label="Decrease"
                                            />
                                        }
                                    >
                                        <KeyboardArrowDownIcon
                                            fontSize={size}
                                            sx={{
                                                transform: "translateY(-2px)",
                                            }}
                                        />
                                    </BaseNumberField.Decrement>
                                </InputAdornment>
                            </>
                        }
                        sx={{
                            pr: 0,
                            ...inputSlotProps?.sx,
                        }}
                    />
                )}
            />
            <FormHelperText sx={{ ml: 0, "&:empty": { mt: 0 } }}>
                {helperText}
            </FormHelperText>
        </BaseNumberField.Root>
    );
}
