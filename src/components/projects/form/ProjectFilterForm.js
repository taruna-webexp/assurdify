import React from "react";
import { Grid, Button } from "@mui/material";
import FormInputSelect from "@/components/share/form/SelectInput";
import { selectOptions } from "@/components/utility/slectOptionService";
import FormInput from "@/components/share/form/InputText";

export default function ProjectFilterForm({ control, errors }) {
    return (
        <Grid container spacing={4} maxWidth="lg" className="projectForm !px-4 md:px-8 justify-center project-search-form gap-2.5 !w-full items-center">
            <Grid item xs={12} md={3} className="space-y-2 !p-0 form-input">
                <FormInput
                    name="projectSearch"
                    placeholder="Search..."
                    control={control}
                    errors={errors}
                />
            </Grid>
            {Object.keys(selectOptions).map((key) => {
                return (
                    <Grid item xs={12} md={2} className="space-y-2 !p-0 form-select" key={key}>
                        <FormInputSelect
                            name={key}
                            defaultValue={selectOptions[key][0]?.value} // Use the value of the first option
                            control={control}
                            options={selectOptions[key]}
                            errors={errors}

                        />

                    </Grid>
                );
            })}

            <Grid item xs={12} md={1} className="space-y-2 !p-0 form-button">
                <Button type="submit" variant='contained' className='gradient-bg theme-border font-medium'>Search</Button>
            </Grid>
        </Grid>

    );
}