import { Component, ReactNode, createElement } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";

import "../ui/MultidatePicker.css";

export interface MultidatePickerComponentProps {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    inputClass?: string;
    editable?: boolean;
    format?: string;
    dateSeparator?: string;
    fullYear?: boolean;
    highlightToday?: boolean;
    minDate?: string;
    maxDate?: string;
    onOpenPickNewDate?: boolean;
    multiple?: boolean;
    range?: boolean;
    rangeHover?: boolean;
    multipleRangeSeparator?: string;
    onlyMonthPicker?: boolean;
    onlyYearPicker?: boolean;
    numberOfMonths?: number;
    disableYearPicker?: boolean;
    disableMonthPicker?: boolean;
    months?: string;
    weekPicker?: boolean;
    disableDayPicker?: boolean;
    weekDays?: string;
    weekStartDayIndex?: number;
    showOtherDays?: boolean;
    displayWeekNumbers?: boolean;
    weekNumber?: string;
    sort?: boolean;
    currentDateYear?: number;
    currentDateMonth?: number;
    currentDateDay?: number;
    headerMonthYearSeparator?: string;
    hideYearFromHeader?: boolean;
    hideMonthFromHeader?: boolean;
    hideWeekDaysFromHeader?: boolean;
    datePanel?: boolean;
    timePicker?: boolean;
    datePickerHeader?: boolean;
    highlightWeekEnd?: boolean;
    highlightWeekEndArray?: string;
    toolbar?: boolean;
    onChange: (value: string) => void;
}

function splitList(raw?: string): string[] | undefined {
    if (!raw || !raw.trim()) {
        return undefined;
    }
    return raw
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
}

function inRange(value: number | undefined, min: number, max: number): number | undefined {
    return value != null && Number.isInteger(value) && value >= min && value <= max ? value : undefined;
}

function parseHighlightWeekends(raw?: string): number[] | undefined {
    const parts = splitList(raw);
    if (!parts) {
        return undefined;
    }
    return parts.map(p => Number(p)).filter(n => !Number.isNaN(n));
}

function parseIncomingValue(
    raw: string | undefined,
    multiple: boolean,
    range: boolean,
    format: string,
    dateSeparator: string,
    multipleRangeSeparator: string
): any {
    if (!raw) {
        return multiple || range ? [] : null;
    }
    try {
        if (range && multiple) {
            return raw.split(multipleRangeSeparator).map(part =>
                part
                    .split(dateSeparator)
                    .map(s => s.trim())
                    .filter(Boolean)
                    .map(s => new DateObject({ date: s, format }))
            );
        }
        if (multiple || range) {
            return raw
                .split(dateSeparator)
                .map(s => s.trim())
                .filter(Boolean)
                .map(s => new DateObject({ date: s, format }));
        }
        return new DateObject({ date: raw, format });
    } catch {
        return multiple || range ? [] : null;
    }
}

function serializeValue(dates: any, format: string, dateSeparator: string, multipleRangeSeparator: string): string {
    if (dates == null) {
        return "";
    }
    if (Array.isArray(dates)) {
        if (dates.length === 0) {
            return "";
        }
        if (Array.isArray(dates[0])) {
            return (dates as DateObject[][])
                .map(group => group.map(d => new DateObject(d).format(format)).join(dateSeparator))
                .join(multipleRangeSeparator);
        }
        return (dates as DateObject[]).map(d => new DateObject(d).format(format)).join(dateSeparator);
    }
    return new DateObject(dates as DateObject).format(format);
}

export class MultidatePickerComponent extends Component<MultidatePickerComponentProps> {
    private readonly onChangeHandle = this.onChange.bind(this);

    render(): ReactNode {
        const format = this.props.format || "YYYY/MM/DD";
        const dateSeparator = this.props.dateSeparator || ",";
        const multipleRangeSeparator = this.props.multipleRangeSeparator || "~";
        const multiple = !!this.props.multiple;
        const range = !!this.props.range;

        const plugins: any[] = [];
        if (this.props.datePanel) {
            plugins.push(<DatePanel position="right" />);
        }
        if (this.props.timePicker) {
            plugins.push(<TimePicker position="bottom" />);
        }
        if (this.props.datePickerHeader) {
            plugins.push(<DatePickerHeader position="top" />);
        }
        if (this.props.toolbar) {
            plugins.push(<Toolbar position="bottom" />);
        }
        if (this.props.highlightWeekEnd) {
            const days = parseHighlightWeekends(this.props.highlightWeekEndArray);
            plugins.push(days && days.length ? weekends(days) : weekends());
        }

        // Empty Integer attributes arrive as 0, so only values in range count as set.
        const year = inRange(this.props.currentDateYear, 1, 9999);
        const month = inRange(this.props.currentDateMonth, 1, 12);
        const day = inRange(this.props.currentDateDay, 1, 31);
        let currentDate: DateObject | undefined;
        if (year != null || month != null || day != null) {
            const now = new DateObject();
            currentDate = new DateObject({
                year: year ?? now.year,
                month: month ?? now.month.number,
                day: day ?? now.day
            });
        }

        const months = splitList(this.props.months);
        const weekDays = splitList(this.props.weekDays);

        return (
            <div className="multidate-picker">
                <DatePicker
                    value={parseIncomingValue(
                        this.props.value,
                        multiple,
                        range,
                        format,
                        dateSeparator,
                        multipleRangeSeparator
                    )}
                    onChange={this.onChangeHandle}
                    format={format}
                    placeholder={this.props.placeholder}
                    disabled={!!this.props.disabled}
                    readOnly={!!this.props.readOnly}
                    className={this.props.inputClass}
                    editable={this.props.editable !== false}
                    dateSeparator={dateSeparator}
                    fullYear={!!this.props.fullYear}
                    highlightToday={this.props.highlightToday !== false}
                    minDate={this.props.minDate || undefined}
                    maxDate={this.props.maxDate || undefined}
                    onOpenPickNewDate={!!this.props.onOpenPickNewDate}
                    multiple={multiple}
                    range={range}
                    rangeHover={!!this.props.rangeHover}
                    onlyMonthPicker={!!this.props.onlyMonthPicker}
                    onlyYearPicker={!!this.props.onlyYearPicker}
                    numberOfMonths={this.props.numberOfMonths || 1}
                    disableYearPicker={!!this.props.disableYearPicker}
                    disableMonthPicker={!!this.props.disableMonthPicker}
                    months={months as any}
                    weekPicker={!!this.props.weekPicker}
                    disableDayPicker={!!this.props.disableDayPicker}
                    weekDays={weekDays as any}
                    weekStartDayIndex={this.props.weekStartDayIndex ?? 0}
                    showOtherDays={!!this.props.showOtherDays}
                    displayWeekNumbers={!!this.props.displayWeekNumbers}
                    weekNumber={this.props.weekNumber}
                    sort={!!this.props.sort}
                    currentDate={currentDate}
                    monthYearSeparator={this.props.headerMonthYearSeparator}
                    hideYear={!!this.props.hideYearFromHeader}
                    hideMonth={!!this.props.hideMonthFromHeader}
                    hideWeekDays={!!this.props.hideWeekDaysFromHeader}
                    plugins={plugins.length ? plugins : undefined}
                />
            </div>
        );
    }

    private onChange(dates: any): void {
        const format = this.props.format || "YYYY/MM/DD";
        const dateSeparator = this.props.dateSeparator || ",";
        const multipleRangeSeparator = this.props.multipleRangeSeparator || "~";
        this.props.onChange(serializeValue(dates, format, dateSeparator, multipleRangeSeparator));
    }
}
