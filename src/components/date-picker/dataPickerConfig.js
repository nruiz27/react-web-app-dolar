export const datePickerConfig = {
    // months list by order
    months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ],
  
    // week days by order
    weekDays: [
      {
        name: 'Lunes',
        short: 'Lu',
      },
      {
        name: 'Martes',
        short: 'Ma',
      },
      {
        name: 'Miércoles',
        short: 'Mi',
      },
      {
        name: 'Jueves',
        short: 'Ju',
      },
      {
        name: 'Viernes',
        short: 'Vi',
      },
      {
        name: 'Sábado',
        short: 'Sa',
        isWeekend: true,
      },
      {
        name: 'Domingo', // used for accessibility 
        short: 'Do', // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
    ],
  
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,
  
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day - 1);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: 'Siguiente',
    previousMonth: 'Anterior',
    openMonthSelector: 'Abrir selector de mes',
    openYearSelector: 'Abrir selector de año',
    closeMonthSelector: 'Cerrar selector de mes',
    closeYearSelector: 'Cerrar selector de año',
    defaultPlaceholder: 'Seleccione',
  
    // for input range value
    from: 'desde',
    to: 'hasta',
  
    // used for input value when multi dates are selected
    digitSeparator: ',',
  
    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
  
    // is your language rtl or ltr?
    isRtl: false,
}