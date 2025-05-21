function gregorianToHijri(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Месяцы в JavaScript начинаются с 0
  const day = date.getDate()

  // Формула для перевода григорианской даты в дату по Хиджре
  const JD =
    Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
    Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4) +
    day -
    32075 -
    0.5

  const HJD = Math.floor(JD) - 1948439 // Разница между юлианским и хиджри календарем
  const hijriYear = Math.floor((HJD - 1) / 354.366) // Год по Хиджре
  const hijriMonth = Math.floor((HJD - 1 - hijriYear * 354.366) / 29.5) // Месяц по Хиджре
  const hijriDay = Math.floor(HJD - 1 - hijriYear * 354.366 - hijriMonth * 29.5) // День по Хиджре

  return {
    hijriYear: hijriYear + 1, // Год по Хиджре
    hijriMonth: hijriMonth + 1, // Месяц по Хиджре
    hijriDay: hijriDay + 1, // День по Хиджре
  }
}

function getHijriDateAndDay(dateString) {
  const date = new Date(dateString)
  const hijriDate = gregorianToHijri(dateString)

  // Получаем день недели
  const days = ['Ahad', 'Ithnain', 'Thulatha', "Arba'a", 'Khamis', "Jumu'a", 'Sabt']
  const dayOfWeek = days[date.getDay()]

  return {
    hijriDate: `${hijriDate.hijriYear}-${hijriDate.hijriMonth}-${hijriDate.hijriDay}`,
    dayOfWeek: dayOfWeek,
  }
}

function formatDateToDDMMYYYY(dateString) {
  // Создаем объект Date из строки
  const date = new Date(dateString)

  // Извлекаем день, месяц и год
  const day = String(date.getDate()).padStart(2, '0') // Добавляем ведущий ноль, если нужно
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0, поэтому добавляем 1
  const year = date.getFullYear()

  // Форматируем дату в dd/mm/yyyy
  return `${day}/${month}/${year}`
}

export { getHijriDateAndDay, formatDateToDDMMYYYY }
