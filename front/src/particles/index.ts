import { IUserBase } from "../shared/interfaces/user";

export default class UserParticle implements IUserBase {
    public readonly name: string;
    public readonly description: string;
    public readonly xAxis: number;
    public readonly yAxis: number;

    constructor(args: IUserBase) {
       ({name: this.name, description: this.description} = args);
    }
}