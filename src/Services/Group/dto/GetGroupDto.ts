import GetGuideDto from "../../Guide/dto/GetGuideDto";
import GetTuristDto from "../../Turist/dto/GetTuristDto";

export default interface GetGroupDto {
    id: number,
    groupCount: number,
    place: string,
    imageUrl: string,
    guide: GetGuideDto,
    turists: GetTuristDto[]
}