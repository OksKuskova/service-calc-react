import { NOT_NUMERIC_REGEX } from "./form.const";

const cleanNotNumericValue = (value: string) => value.replace(NOT_NUMERIC_REGEX, '');

export { cleanNotNumericValue }