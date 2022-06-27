export default interface GetGuideDto {
  id: number,
  idGrupo: number,
  name: string,
  password: string,
  email: string,
  tipo: string,
  document: string,
  birthDate: string,
  genrer: string,
  cellphone: string,
  isAdmin: boolean,
  isActive: boolean
}