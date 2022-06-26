import UserModelDto from "../../User/dto/UserModelDto"

export default interface AuthResponseDto {
    access_token: string,
    dadoslogin: UserModelDto
}
