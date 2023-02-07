import { format } from 'date-fns'

export const customFormatDateLocation = (dateCreated) => {
  if (!dateCreated) return ''
  const rest = new Date(dateCreated.replace(' ', 'T'))
  // const fromDate = new Date('2022-08-06T02:00:00')
  // if (rest > fromDate) {
  //   rest.setHours(rest.getHours() - 5)
  // }
  rest.setHours(rest.getHours() - 5)
  const resultFormatDate = format(rest, "dd-MM-yyyy hh:mm aaaaa'm'")
  const resultConvet0000 = resultFormatDate.replace('12:00 am', '00:00 pm')
  // console.log(rest)
  // console.log(resultFormatDate)
  // console.log(resultConvet0000)

  // TODO: RESTAR 5 horas apartir del 6 de agostro del 2022 alas 02:00 horas.
  return `${resultConvet0000}`
}
