export default interface GetLocationDto {
    id: number,
    idGrupo: number,
    historics: any,
    posicoes: [number, number][],
    date: string
}


