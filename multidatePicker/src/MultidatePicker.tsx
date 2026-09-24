import { Component, ReactNode, createElement } from "react";
import { MultidatePickerContainerProps } from "../typings/MultidatePickerProps";
import { MultidatePickerComponent } from "./components/MultidatePickerComponent";

import "./ui/MultidatePicker.css";

function boolVal(v: boolean | undefined, fallback = false): boolean {
    return v !== undefined ? v : fallback;
}

export class MultidatePicker extends Component<MultidatePickerContainerProps> {
    private readonly onChangeHandle = this.onChange.bind(this);

    render(): ReactNode {
        return (
            <MultidatePickerComponent
                value={this.props.valueKey?.value}
                placeholder={this.props.placeholderKey?.value}
                disabled={boolVal(this.props.disabledKey?.value)}
                readOnly={boolVal(this.props.readOnlyKey?.value)}
                inputClass={this.props.inputClassKey?.value}
                editable={boolVal(this.props.editableKey?.value, true)}
                format={this.props.formatKey?.value}
                dateSeparator={this.props.dateSeparatorKey?.value}
                fullYear={boolVal(this.props.fullYearKey?.value)}
                highlightToday={boolVal(this.props.highlightTodayKey?.value, true)}
                minDate={this.props.minDateKey?.value}
                maxDate={this.props.maxDateKey?.value}
                onOpenPickNewDate={boolVal(this.props.onOpenPickNewDateKey?.value)}
                multiple={boolVal(this.props.multipleKey?.value)}
                range={boolVal(this.props.rangeKey?.value)}
                rangeHover={boolVal(this.props.rangeHoverKey?.value)}
                multipleRangeSeparator={this.props.multipleRangeSeparatorKey?.value}
                onlyMonthPicker={boolVal(this.props.onlyMonthPickerKey?.value)}
                onlyYearPicker={boolVal(this.props.onlyYearPickerKey?.value)}
                numberOfMonths={
                    this.props.noofMonthsKey?.value != null ? Number(this.props.noofMonthsKey.value) : undefined
                }
                disableYearPicker={boolVal(this.props.disableYearPickerKey?.value)}
                disableMonthPicker={boolVal(this.props.disableMonthPickerKey?.value)}
                months={this.props.monthsKey?.value}
                weekPicker={boolVal(this.props.weekPickerKey?.value)}
                disableDayPicker={boolVal(this.props.disableDayPickerKey?.value)}
                weekDays={this.props.weekDaysKey?.value}
                weekStartDayIndex={
                    this.props.weekStartDayIndexKey?.value != null
                        ? Number(this.props.weekStartDayIndexKey.value)
                        : undefined
                }
                showOtherDays={boolVal(this.props.showOtherDaysKey?.value)}
                displayWeekNumbers={boolVal(this.props.displayWeekNumbersKey?.value)}
                weekNumber={this.props.weekNumberNameKey?.value}
                sort={boolVal(this.props.sortKey?.value)}
                currentDateYear={
                    this.props.currentDateYearKey?.value != null
                        ? Number(this.props.currentDateYearKey.value)
                        : undefined
                }
                currentDateMonth={
                    this.props.currentDateMonthKey?.value != null
                        ? Number(this.props.currentDateMonthKey.value)
                        : undefined
                }
                currentDateDay={
                    this.props.currentDateDayKey?.value != null ? Number(this.props.currentDateDayKey.value) : undefined
                }
                headerMonthYearSeparator={this.props.headerMonthYearSeparatorKey?.value}
                hideYearFromHeader={boolVal(this.props.hideYearFromHeaderKey?.value)}
                hideMonthFromHeader={boolVal(this.props.hideMonthFromHeaderKey?.value)}
                hideWeekDaysFromHeader={boolVal(this.props.hideWeekDaysFromHeaderKey?.value)}
                datePanel={boolVal(this.props.DatePanelKey?.value)}
                timePicker={boolVal(this.props.TimePickerKey?.value)}
                datePickerHeader={boolVal(this.props.DatePickerHeaderKey?.value)}
                highlightWeekEnd={boolVal(this.props.highlightWeekEndKey?.value)}
                highlightWeekEndArray={this.props.highlightWeekEndArrayKey?.value}
                toolbar={boolVal(this.props.ToolbarKey?.value)}
                onChange={this.onChangeHandle}
            />
        );
    }

    private onChange(value: string): void {
        if (this.props.valueKey) {
            this.props.valueKey.setValue(value);
        }
    }
}
