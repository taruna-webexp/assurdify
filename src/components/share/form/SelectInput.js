import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
    name,
    control,
    label,
    options,
    defaultValue,

}) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue || ""}

                render={({ field }) => (
                    <Select
                        label={label}
                        id={name}
                        {...field}
                        className="shadow-lg"
                    >
                        {options?.map((option) => (
                            <MenuItem
                                className="capitalize"
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />

        </FormControl>
    );
};

export default FormInputSelect;
