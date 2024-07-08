<section>
    <label>React Datepicker</label>
    <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { value, ...fieldProps } }) => {
            return (
                <ReactDatePicker
                    {...fieldProps}
                    className="input"
                    placeholderText="Select date"
                    selected={value}
                />
            );
        }}
    />
</section>