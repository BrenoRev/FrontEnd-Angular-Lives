import { SafeResourceUrl } from "@angular/platform-browser";

export class Live{
    id!:Number;
    liveName!:string;
    channelName!:string;
    liveDate!:string;
    liveTime!:string;
    liveLink!:string;
    registrationDate!:string;
    urlSafe!: SafeResourceUrl;
}