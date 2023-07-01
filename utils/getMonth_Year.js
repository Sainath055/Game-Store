

export const generateMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const monthValue = i.toString().padStart(2, '0');
      const monthOption = {
        value: monthValue,
        label: monthValue,
      };
      months.push(monthOption);
    }
    return months;
  };

export const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 1 ; i < currentYear + 12; i++) {
      const yearValue = i.toString();
      const yearOption = {
        value: yearValue,
        label: yearValue,
      };
      years.push(yearOption);
    }
    return years;
  };