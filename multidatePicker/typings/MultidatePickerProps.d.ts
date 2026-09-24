/**
 * This file was generated from MultidatePicker.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";
import { Big } from "big.js";

export interface MultidatePickerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueKey: EditableValue<string>;
    placeholderKey?: EditableValue<string>;
    disabledKey?: EditableValue<boolean>;
    readOnlyKey?: EditableValue<boolean>;
    inputClassKey?: EditableValue<string>;
    editableKey?: EditableValue<boolean>;
    formatKey?: EditableValue<string>;
    dateSeparatorKey?: EditableValue<string>;
    fullYearKey?: EditableValue<boolean>;
    highlightTodayKey?: EditableValue<boolean>;
    minDateKey?: EditableValue<string>;
    maxDateKey?: EditableValue<string>;
    onOpenPickNewDateKey?: EditableValue<boolean>;
    multipleKey?: EditableValue<boolean>;
    rangeKey?: EditableValue<boolean>;
    rangeHoverKey?: EditableValue<boolean>;
    multipleRangeSeparatorKey?: EditableValue<string>;
    onlyMonthPickerKey?: EditableValue<boolean>;
    onlyYearPickerKey?: EditableValue<boolean>;
    noofMonthsKey?: EditableValue<Big>;
    disableYearPickerKey?: EditableValue<boolean>;
    disableMonthPickerKey?: EditableValue<boolean>;
    monthsKey?: EditableValue<string>;
    weekPickerKey?: EditableValue<boolean>;
    disableDayPickerKey?: EditableValue<boolean>;
    weekDaysKey?: EditableValue<string>;
    weekStartDayIndexKey?: EditableValue<Big>;
    showOtherDaysKey?: EditableValue<boolean>;
    displayWeekNumbersKey?: EditableValue<boolean>;
    weekNumberNameKey?: EditableValue<string>;
    sortKey?: EditableValue<boolean>;
    currentDateYearKey?: EditableValue<Big>;
    currentDateMonthKey?: EditableValue<Big>;
    currentDateDayKey?: EditableValue<Big>;
    headerMonthYearSeparatorKey?: EditableValue<string>;
    hideYearFromHeaderKey?: EditableValue<boolean>;
    hideMonthFromHeaderKey?: EditableValue<boolean>;
    hideWeekDaysFromHeaderKey?: EditableValue<boolean>;
    DatePanelKey?: EditableValue<boolean>;
    TimePickerKey?: EditableValue<boolean>;
    DatePickerHeaderKey?: EditableValue<boolean>;
    highlightWeekEndKey?: EditableValue<boolean>;
    highlightWeekEndArrayKey?: EditableValue<string>;
    ToolbarKey?: EditableValue<boolean>;
}

export interface MultidatePickerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    valueKey: string;
    placeholderKey: string;
    disabledKey: string;
    readOnlyKey: string;
    inputClassKey: string;
    editableKey: string;
    formatKey: string;
    dateSeparatorKey: string;
    fullYearKey: string;
    highlightTodayKey: string;
    minDateKey: string;
    maxDateKey: string;
    onOpenPickNewDateKey: string;
    multipleKey: string;
    rangeKey: string;
    rangeHoverKey: string;
    multipleRangeSeparatorKey: string;
    onlyMonthPickerKey: string;
    onlyYearPickerKey: string;
    noofMonthsKey: string;
    disableYearPickerKey: string;
    disableMonthPickerKey: string;
    monthsKey: string;
    weekPickerKey: string;
    disableDayPickerKey: string;
    weekDaysKey: string;
    weekStartDayIndexKey: string;
    showOtherDaysKey: string;
    displayWeekNumbersKey: string;
    weekNumberNameKey: string;
    sortKey: string;
    currentDateYearKey: string;
    currentDateMonthKey: string;
    currentDateDayKey: string;
    headerMonthYearSeparatorKey: string;
    hideYearFromHeaderKey: string;
    hideMonthFromHeaderKey: string;
    hideWeekDaysFromHeaderKey: string;
    DatePanelKey: string;
    TimePickerKey: string;
    DatePickerHeaderKey: string;
    highlightWeekEndKey: string;
    highlightWeekEndArrayKey: string;
    ToolbarKey: string;
}
